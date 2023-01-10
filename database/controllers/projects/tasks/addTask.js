import Sections from "../../../../model/Projects/Sections";
import Tasks from "../../../../model/Projects/Tasks";

export const addTask = async (req, res) => {
  const { boardId, sectionId: reqSectionId } = req.body;
  const { sectionId } = reqSectionId;
  console.log(sectionId, "sectionId");
  try {
    const section = await Sections.findById(sectionId);
    console.log(section, "section");
    const tasksCount = await Tasks.find({ section: sectionId }).count();
    console.log(tasksCount, "taskCount");
    const task = await Tasks.create({
      section: sectionId,
      position: tasksCount > 0 ? tasksCount : 0,
    });
    task._doc.section = section;
    console.log(task, "task");
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
