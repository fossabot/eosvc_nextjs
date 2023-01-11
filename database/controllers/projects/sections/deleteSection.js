import Sections from "../../../../model/Projects/Sections";
import Tasks from "../../../../model/Projects/Tasks";

export const deleteSection = async (req, res) => {
  const { sectionId } = req.body;
  console.log(sectionId, "req");

  try {
    await Tasks.deleteMany({ section: sectionId });
    await Sections.deleteOne({ _id: sectionId });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).josn(err);
  }
};
