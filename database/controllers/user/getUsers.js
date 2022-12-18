import User from "../../../model/User/User";

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ error: "Users Data not found" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Users Data" });
  }
}
