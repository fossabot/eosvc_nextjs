import Sections from "../../../../model/Projects/Sections";

export async function addSection(req, res) {
  try {
    console.log(req.body.boardId, "req add Section");
    const section = await Sections.create({
      board: req.body.boardId,
      title: "New Section",
    });
    return res.status(201).json(section);
    //res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
}
