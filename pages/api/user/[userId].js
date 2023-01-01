import connectMongo from "../../../database/conn";
import { getUser } from "../../../database/controllers/user/getUser";
import { addUser } from "../../../database/controllers/user/addUser";
import { updateUser } from "../../../database/controllers/user/updateUser";
import { deleteUser } from "../../../database/controllers/user/deleteUser";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "POST":
      addUser(req, res);
      break;
    case "PUT":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      //res.status(200).json({ success: "Success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
