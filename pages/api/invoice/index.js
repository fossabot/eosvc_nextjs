import connectMongo from "../../../database/conn";
import { getInvoices } from "../../../database/controllers/invoices/getInvoices";
import { addInvoice } from "../../../database/controllers/invoices/addInvoice";
import { deleteInvoice } from "../../../database/controllers/invoices/deleteInvoice";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getInvoices(req, res);
      break;
    case "POST":
      addInvoice(req, res);
      break;
    case "DELETE":
      deleteInvoice(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
