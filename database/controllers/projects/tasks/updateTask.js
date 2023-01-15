import Tasks from "../../../../model/Projects/Tasks";

export const updateTask = async (req, res) => {
  const { taskId } = req.body;
  const { content } = req.body.newContent;
  try {
    const task = await Tasks.findByIdAndUpdate(taskId, {
      $set: { content: content, lastEditedAt: Date.now() },
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
