import Sections from "../../../../model/Projects/Sections";

export const updateSection = async (req, res) => {
  //exports.update = async (req, res) => {
  const { sectionId } = req.query;
  const { title, boardId } = req.body;
  console.log(sectionId, "updateSection - sectionId");
  console.log(req.body, "updateSection - req.body");
  try {
    const section = await Sections.findByIdAndUpdate(sectionId, {
      title: title,
    });
    section._doc.tasks = [];
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json(err);
  }
};
