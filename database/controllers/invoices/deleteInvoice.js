import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import AWS from "aws-sdk";

import Invoice from "../../../model/Invoices/Invoice";

const s3 = new AWS.S3({
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DO_ACCESS_KEY_SECRET,
  },
});

export async function deleteInvoice(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const { invoiceFileUrl, invoiceId } = req.body;
    let fileName = invoiceFileUrl.substring(
      invoiceFileUrl.lastIndexOf("/") + 1
    );
    console.log(fileName, "fileName");

    s3.deleteObjects(
      {
        Bucket: process.env.DO_BUCKET,
        Delete: {
          Objects: [
            {
              Key: fileName,
            },
          ],
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Deleted ${data.Deleted.length} objects`);
        }
      }
    );

    try {
      const invoice = await Invoice.deleteOne({ _id: invoiceId });
      res.status(200).json(invoice);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Not Signed in
    res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
