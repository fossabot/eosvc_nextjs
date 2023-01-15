import connectMongo from "../../../../../database/conn";
import { updateBoardVisibility } from "../../../../../database/controllers/projects/boards/updateBoardVisibility";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "PUT":
      updateBoardVisibility(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
