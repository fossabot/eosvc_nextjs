import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

import Sections from "../../../../model/Projects/Sections";
import Tasks from "../../../../model/Projects/Tasks";

export const addTaskFromTodo = async (req, res) => {
  const { boardId, sectionId, content } = req.body;
  console.log(boardId, "boardId");
  console.log(sectionId, "sectionId");
  console.log(content, "cotent");

  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const section = await Sections.findById(sectionId);
      console.log(section, "section");
      const tasksCount = await Tasks.find({ section: sectionId }).count();
      console.log(tasksCount, "taskCount");
      const task = await Tasks.create({
        section: sectionId,
        createdAt: Date.now(),
        title: content.title,
        content: content.description + " " + content.url,
        position: tasksCount > 0 ? tasksCount : 0,
      });
      task._doc.section = section;
      console.log(task, "task");
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Not Signed in
    return res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
};
