import connectMongo from "../../../../database/conn";
import { addSection } from "../../../../database/controllers/projects/sections/addSection";
import { deleteSection } from "../../../../database/controllers/projects/sections/deleteSection";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  //Type of request
  const { method } = req;
  switch (method) {
    case "POST":
      addSection(req, res);
      break;
    case "DELETE":
      deleteSection(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
