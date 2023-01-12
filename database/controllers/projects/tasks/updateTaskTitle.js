import Tasks from "../../../../model/Projects/Tasks";

export const updateTaskTitle = async (req, res) => {
  console.log(req.body, "req.body updateTask");
  const { taskId } = req.body;
  const { title } = req.body.newTitle;
  try {
    const task = await Tasks.findByIdAndUpdate(taskId, { title: title });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
