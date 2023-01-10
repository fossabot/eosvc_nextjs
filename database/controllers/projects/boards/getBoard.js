import Boards from "../../../../model/Projects/Boards";
import Sections from "../../../../model/Projects/Sections";
import Tasks from "../../../../model/Projects/Tasks";

export async function getBoard(req, res) {
  //const { boardId } = req.params;
  const boardId = req.query.boardId;
  console.log(boardId, "getBoard - boardId");
  //return console.log("stop");
  try {
    //const board = await Boards.findOne({ user: req.user._id, _id: boardId });
    const board = await Boards.findOne({ _id: boardId });
    if (!board) return res.status(404).json("Board not found");
    const sections = await Sections.find({ board: boardId });
    for (const section of sections) {
      const tasks = await Tasks.find({ section: section.id })
        .populate("section")
        .sort("-position");
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
}
