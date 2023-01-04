export async function updateFavouritePositions(req, res) {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, {
        $set: { favouritePosition: key },
      });
    }
    return res.status(200).json("updated");
  } catch (err) {
    return res.status(500).json(err);
  }
}
