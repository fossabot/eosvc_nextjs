/* 
import busboy from "busboy";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_REGION,
});

const uploadFile = async (req, res) => {
  //console.log(req.headers, "req.headers");
  console.log(req.body, "req.body");
  return;
  const bb = new busboy({ headers: req.headers });
  bb.on("file", async (_, file, info) => {
    const fileName = info.filename;
    try {
      const parallelUpload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.S3_BUCKET,
          Key: `${Math.random().toString(26).substring(2)}-${fileName}`,
          Body: file,
        },
      });
      const data = await parallelUpload.done();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end("File uploaded");
  });
  req.pipe(bb);
  return;
};

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "POST":
      return uploadFile(req, res);
  }
}

import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_REGION,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (!files.demo) {
      return res.status(400).send("No file uploaded");
    }

    try {
      return s3.putObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: files.demo.originalFilename,
          Body: fs.createReadStream(files.demo.filepath),
          ACL: "public-read",
        },
        async () => res.status(200).send("File uploaded")
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Error uploading file");
    }
  });
}
 */
