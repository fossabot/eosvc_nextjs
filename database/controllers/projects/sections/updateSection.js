export async function updateSection(req, res) {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;

  try {
    if (title === "") req.body.title = "Untitled";
    if (description === "") req.body.description = "Add description here";
    const currentBoard = await Board.findById(boardId);
    if (!currentBoard) return res.status(404).json("Board not found");

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
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
          await Board.findByIdAndUpdate(element.id, {
            $set: { favouritePosition: key },
          });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, { $set: req.body });
    return res.status(200).json(board);
  } catch (err) {
    return res.status(500).json(err);
  }
}
