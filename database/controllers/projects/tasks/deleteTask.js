import Tasks from "../../../../model/Projects/Tasks";

export const deleteTask = async (req, res) => {
  //console.log(req.body, "req.body from deleteTask API call");
  const { boardId, taskId } = req.body;
  console.log(boardId, "boardId from deleteTask API call");
  console.log(taskId, "taskId from deleteTask API call");

  try {
    const currentTask = await Tasks.findById(taskId);
    await Tasks.deleteOne({ _id: taskId });
    const tasks = await Tasks.find({ section: currentTask.section }).sort(
      "postition"
    );
    for (const key in tasks) {
      //POZOR na id vs _id
      await Tasks.findByIdAndUpdate(tasks[key]._id, {
        $set: { position: key },
      });
    }
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
