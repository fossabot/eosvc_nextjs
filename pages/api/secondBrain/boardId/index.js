import connectMongo from "../../../../database/conn";
import { addTaskFromTodo } from "../../../../database/controllers/secondBrain/projects/addTaskFromTodo";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "POST":
      addTaskFromTodo(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
