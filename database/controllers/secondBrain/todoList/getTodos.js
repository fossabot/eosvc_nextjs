import TodoList from "../../../../model/SecondBrain/TodoList";

export async function getTodos(req, res) {
  const { userId } = req.query;
  try {
    const todos = await TodoList.find({ user: userId }).sort("-createdAt");
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
}
