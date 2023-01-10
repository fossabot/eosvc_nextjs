import TodoList from "../../../../model/SecondBrain/TodoList";

export async function addTodo(req, res) {
  try {
    console.log(req.body, "req");
    const todosCount = await TodoList.find().count();

    const todo = await TodoList.create({
      user: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      position: boardsCount > 0 ? boardsCount : 0,
    });

    return res.status(201).json(todo);
    //res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
}
