import Sections from "../../../../model/Projects/Sections";

export async function getSections(req, res) {
  const { boardId } = req.query;
  //console.log(req.query, "req.query");
  try {
    const sections = await Sections.find({ board: boardId });
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json(err);
  }
}
