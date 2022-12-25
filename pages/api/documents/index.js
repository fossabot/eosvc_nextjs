import connectMongo from "../../../database/conn";
import { getDocuments } from "../../../database/controllers/documents/Images/getImages";
import { addEmployee } from "../../../database/controllers/employee/addEmployee";
import { editEmployee } from "../../../database/controllers/employee/editEmployee";
import { deleteEmployee } from "../../../database/controllers/employee/deleteEmployee";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getEmployees(req, res);
      break;
    case "POST":
      addEmployee(req, res);
      break;
    case "PUT":
      editEmployee(req, res);
      break;
    case "DELETE":
      deleteEmployee(req, res);
      //res.status(200).json({ success: "Success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
