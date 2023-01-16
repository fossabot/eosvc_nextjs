import connectMongo from "../../../../database/conn";
import { deleteTodo } from "../../../../database/controllers/secondBrain/todoList/deleteTodo";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  //Type of request
  const { method } = req;
  switch (method) {
    case "DELETE":
      deleteTodo(req, res);
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
