import Sections from "../../../../model/Projects/Sections";

export async function addSection(req, res) {
  try {
    console.log(req.body.boardId, "req add Section");
    const section = await Sections.create({
      board: req.body.boardId,
      title: "New Section",
    });
    section._doc.tasks = [];
    return res.status(201).json(section);
    //res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
}
/*
exports.create = async (req, res) => {
  const { boardId } = req.params;
  try {
    const section = await Section.create({ board: boardId });
    section._doc.tasks = [];
    res.status(201).json(section);
  } catch (err) {
    res.status(500).josn(err);
  }
};
*/
