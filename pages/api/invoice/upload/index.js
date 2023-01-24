import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";
import Invoice from "../../../../model/Invoices/Invoice";

const s3 = new AWS.S3({
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DO_ACCESS_KEY_SECRET,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function addInvoice(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  //const session = true;
  if (session) {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (!files.invoice) {
        return res.status(400).send("No file uploaded");
      }

      const filename = files.invoice.originalFilename + "-" + Date.now();

      try {
        await s3
          .putObject({
            Bucket: process.env.DO_BUCKET,
            Key: filename,
            Body: fs.createReadStream(files.invoice.filepath),
            ACL: "public-read",
          })
          .promise();

        const url = await s3
          .getSignedUrl("getObject", {
            Bucket: process.env.DO_BUCKET,
            Key: filename,
            Expires: 0, // URL will never expire
          })
          .promise();
        console.log(url, "url");
        const invoice = await Invoice.create({
          invoice_file_url: url,
          invoice_file_mimeType: files.invoice.type,
        });
        invoice.save();
        return res.status(200).send(invoice);
      } catch (error) {
        console.log(error);
        res.status(500).send("Error uploading file");
      }
    });
  }
}
