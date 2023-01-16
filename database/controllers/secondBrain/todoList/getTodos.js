import TodoList from "../../../../model/SecondBrain/TodoList";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export async function getTodos(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const todos = await TodoList.find({}).sort("-createdAt");
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Not Signed in
    res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
