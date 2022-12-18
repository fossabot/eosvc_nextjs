import Users from "../../../model/User/User";

export async function getUserId(req, res) {
  try {
    const { userEmail } = req.query;
    console.log(userEmail);
    if (userEmail) {
      const user = await Users.findOne({ email: userEmail });
      await res.status(200).json(user);
      await res.end();
    }

    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching User" });
  }
}
