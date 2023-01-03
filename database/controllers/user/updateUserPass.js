import { hash } from "bcryptjs";
import Users from "../../../model/User/User";

export async function updateUserPass(req, res) {
  console.log(req.body, "req.body");
  try {
    const { userId } = req.query;
    const password = req.body;
    console.log(password, "password");
    if (userId) {
      console.log("Updating User Password");
      await Users.findByIdAndUpdate(userId, {
        password: await hash(password, 12),
      });
      return res
        .status(200)
        .json({ success: "User Password change Successfully" });
    }
    return res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    return res.status(404).json({ error: "Error Updating User Data" });
  }
}
