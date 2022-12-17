import connectMongo from "../../../../database/conn";
import { getUserId } from "../../../../database/controllers/user/getUserId";
import { addUser } from "../../../../database/controllers/user/addUser";
import { editUser } from "../../../../database/controllers/user/editUser";
import { deleteUser } from "../../../../database/controllers/user/deleteUser";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUserId(req, res);
      break;
    case "POST":
      addUser(req, res);
      break;
    case "PUT":
      editUser(req, res);
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
