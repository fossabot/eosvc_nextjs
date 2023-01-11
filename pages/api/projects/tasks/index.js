import connectMongo from "../../../../database/conn";
import { addTask } from "../../../../database/controllers/projects/tasks/addTask";
import { updateTask } from "../../../../database/controllers/projects/tasks/updateTask";
import { deleteTask } from "../../../../database/controllers/projects/tasks/deleteTask";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );
  //Type of request
  const { method } = req;
  switch (method) {
    case "POST":
      addTask(req, res);
      break;
    case "PUT":
      updateTask(req, res);
      break;
    case "DELETE":
      deleteTask(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
