import connectMongo from "../../../database/conn";
import { getAccount } from "../../../database/controllers/accounts/getAccount";
import { addAccount } from "../../../database/controllers/accounts/addAccount";
import { editAccount } from "../../../database/controllers/accounts/editAccount";
import { deleteAccount } from "../../../database/controllers/accounts/deleteAccount";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getAccount(req, res);
      break;
    case "POST":
      addAccount(req, res);
      break;
    case "PUT":
      editAccount(req, res);
      break;
    case "DELETE":
      deleteAccount(req, res);
      //res.status(200).json({ success: "Success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
