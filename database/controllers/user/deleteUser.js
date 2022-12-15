import User from "../../../model/User/User";

export async function deleteEmployee(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await User.findByIdAndDelete(userId);
      return res.status(200).json({ deleted: userId });
    }

    res.status(404).json({ error: "User Not Selected!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting User" });
  }
}
