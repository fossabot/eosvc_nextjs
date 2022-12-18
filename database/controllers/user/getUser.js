import User from "../../../model/User/User";

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findById(userId);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User not selected" });
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching User" });
  }
}
