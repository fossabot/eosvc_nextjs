import User from "../../../model/User/User";

export async function editUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      await User.findByIdAndUpdate(userId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating User Data" });
  }
}
