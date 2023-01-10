import Tasks from "../../../../model/Projects/Tasks";

export const updateTask = async (req, res) => {
  console.log(req.body, "req.body updateTask");
  /*
  const { taskId } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { $set: req.body });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
  */
};
