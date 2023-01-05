import Boards from "../../../../model/Projects/Boards";

export async function getBoards(req, res) {
  const { userId } = req.query;
  try {
    const boards = await Boards.find({ user: userId }).sort("-position");
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err);
  }
}
