import Boards from "../../../model/Projects/Boards";
import Sections from "../../../model/Projects/Sections";
import Tasks from "../../../model/Projects/Tasks";

export async function deleteBoard(req, res) {
  const { boardId } = req.params;
  try {
    const sections = await Sections.find({ board: boardId });
    for (const section of sections) {
      await Tasks.deleteMany({ section: section.id });
    }
    await Sections.deleteMany({ board: boardId });

    const currentBoard = await Boards.findById(boardId);

    if (currentBoard.favourite) {
      const favourites = await Boards.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort("favouritePosition");

      for (const key in favourites) {
        const element = favourites[key];
        await Boards.findByIdAndUpdate(element.id, {
          $set: { favouritePosition: key },
        });
      }
    }

    await Boards.deleteOne({ _id: boardId });

    const boards = await Boards.find().sort("position");
    for (const key in boards) {
      const board = boards[key];
      await Boards.findByIdAndUpdate(board.id, { $set: { position: key } });
    }

    return res.status(200).json("deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
}
