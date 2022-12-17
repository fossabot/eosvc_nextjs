import connectMongo from "../../../../database/conn";
import { addIndustry } from "../../../../database/controllers/setup/Industry/addIndustry";
import { getIndustry } from "../../../../database/controllers/setup/Industry/getIndustry";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getIndustry(req, res);
      break;
    case "POST":
      addIndustry(req, res);
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
