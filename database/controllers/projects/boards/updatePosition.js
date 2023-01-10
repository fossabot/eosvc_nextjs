import Boards from "../../../../model/Projects/Boards";

export async function updatePosition(req, res) {
  const { boards } = req.body;
  console.log(boards, "boards from updatePosition");
  /*
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Boards.findByIdAndUpdate(board.id, { $set: { position: key } });
    }
    res.status(200).json("Position updated");
  } catch (err) {
    res.status(500).json(err);
  }
  */
}
