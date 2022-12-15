import User from "../../../model/User/User";

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findById(userId);
      res.status(200).json(user);
      res.end();
    }

    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching User" });
  }
}
