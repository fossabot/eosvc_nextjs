import connectMongo from "../../../../database/conn";
import { getImages } from "../../../../database/controllers/documents/Images/getImages";
import { addImage } from "../../../../database/controllers/documents/Images/addImage";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getImages(req, res);
      break;
    case "POST":
      addImage(req, res);
      break;
      //res.status(200).json({ success: "Success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
