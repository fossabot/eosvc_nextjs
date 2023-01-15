import Boards from "../../../../model/Projects/Boards";

export async function getAllBoards(req, res) {
  //const { userId } = req.query;
  try {
    const boards = await Boards.find({}).sort("-position");
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err);
  }
}
