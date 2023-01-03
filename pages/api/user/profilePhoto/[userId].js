import connectMongo from "../../../../database/conn";
import { updateUserPhoto } from "../../../../database/controllers/user/updateUserPhoto";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "PUT":
      updateUserPhoto(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
