import Boards from "../../../model/Projects/Boards";

export async function getBoards(req, res) {
  try {
    const boards = await Boards.find({});
    //const boards = "Hellow world";
    return res.status(200).json(boards);
  } catch (err) {
    return res.status(500).json(err);
  }
}
