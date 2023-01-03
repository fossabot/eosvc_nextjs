import Users from "../../../model/User/User";

export async function updateUserPhoto(req, res) {
  console.log(req.body, "req.body");
  try {
    const { userId } = req.query;
    const avatar = req.body.myFile;

    if (userId) {
      console.log("Updating User Photo");
      await Users.findByIdAndUpdate(userId, {
        avatar: avatar,
      });
      return res
        .status(200)
        .json({ success: "User Photo change Successfully" });
    }
    return res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    return res.status(404).json({ error: "Error Updating User Data" });
  }
}
