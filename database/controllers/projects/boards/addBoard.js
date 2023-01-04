import Boards from "../../../../model/Projects/Boards";

export async function addBoard(req, res) {
  try {
    console.log(req.query["user"]);
    const boardsCount = await Boards.find().count();
    console.log(boardsCount, "Bcount");
    /*
    const board = await Boards.create({
      user: req.query["user"],
      position: boardsCount > 0 ? boardsCount : 0,
    });
    */
    console.log(board, "board");
    return res.status(201).json(board);
    //res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
}
