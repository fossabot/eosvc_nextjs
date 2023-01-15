import Boards from "../../../../model/Projects/Boards";

export async function updateBoardFavourite(req, res) {
  //console.log(req.body, "req.body from updateBoard");
  const { boardId } = req.body;
  //const { title } = req.body?.title;
  //const { description } = req.body?.description;
  const { favourite } = req.body.favourite;

  console.log(boardId, "Board ID from updateBoard");
  console.log(favourite, "favourite");
  //console.log(title, "title");
  //console.log(description, "description");

  /*
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;
 */
  try {
    //if (title === "") req.body.title = "Untitled";
    // if (description === "") req.body.description = "Add description here";
    /*
    const currentBoard = await Boards.findById(boardId);
    if (!currentBoard) return res.status(404).json("Board not found");

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Boards.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort("favouritePosition");
      if (favourite) {
        req.body.favouritePosition =
          favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          const element = favourites[key];
          await Boards.findByIdAndUpdate(element._id, {
            $set: { favouritePosition: key },
          });
        }
      }
    }
*/
    const board = await Boards.findByIdAndUpdate(boardId, {
      favourite: favourite,
    });
    return res.status(200).json(board);
  } catch (err) {
    return res.status(500).json(err);
  }
}
