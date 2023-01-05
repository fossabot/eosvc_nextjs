import connectMongo from "../../../../database/conn";
import { addBoard } from "../../../../database/controllers/projects/boards/addBoard";
import { updateBoard } from "../../../../database/controllers/projects/boards/updateBoard";
import { deleteBoard } from "../../../../database/controllers/projects/boards/deleteBoard";
import { getBoards } from "../../../../database/controllers/projects/boards/getBoards";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getBoards(req, res);
      break;
    case "POST":
      addBoard(req, res);
      break;
    case "PUT":
      updateBoard(req, res);
      break;
    case "DELETE":
      deleteBoard(req, res);
      //res.status(200).json({ success: "Success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metod ${method} Not Allowed`);
  }
}
