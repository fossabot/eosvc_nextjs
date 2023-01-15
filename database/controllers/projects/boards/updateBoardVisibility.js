import Boards from "../../../../model/Projects/Boards";

export async function updateBoardVisibility(req, res) {
  //console.log(req.body, "req.body from updateBoard");
  console.log(req.body, "req.body from updateBoardVisibility");
  const { boardId } = req.body;
  const { visibility } = req.body.visibility;
  console.log(visibility, "visibility from updateBoardVisibility");

  try {
    const board = await Boards.findByIdAndUpdate(boardId, {
      visibility: visibility,
    });
    return res.status(200).json(board);
  } catch (err) {
    return res.status(500).json(err);
  }
}
