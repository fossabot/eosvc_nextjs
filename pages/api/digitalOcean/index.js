import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";
import Invoice from "../../../model/Invoices/Invoice";

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

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (!files.invoice) {
      return res.status(400).send("No file uploaded");
    }
    //return console.log(files.invoice, "files.invoice");
    const filename = Date.now() + "-" + files.invoice.originalFilename;
    //return console.log(filename, "files.invoice");
    try {
      await s3
        .putObject({
          Bucket: process.env.DO_BUCKET,
          Key: filename,
          Body: fs.createReadStream(files.invoice.filepath),
          ACL: "public-read",
        })
        .promise();

      const url = `https://${process.env.DO_BUCKET}.${process.env.DO_REGION}.digitaloceanspaces.com/${filename}`;

      console.log(url, "url");
      const invoice = await Invoice.create({
        invoice_file_url: url,
        invoice_file_mimeType: files.invoice.mimetype,
      });
      return res.status(200).send(invoice);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error uploading file");
    }
  });
}
