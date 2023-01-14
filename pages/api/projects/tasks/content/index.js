import connectMongo from "../../../../../database/conn";
import { updateTask } from "../../../../../database/controllers/projects/tasks/updateTask";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  //Type of request
  const { method } = req;
  switch (method) {
    case "PUT":
      updateTask(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
