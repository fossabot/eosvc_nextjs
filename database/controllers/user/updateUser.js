import { hash } from "bcryptjs";
import User from "../../../model/User/User";

export async function updateUser(req, res) {
  console.log(req.query);
  console.log(req.body);
  try {
    const { userId } = req.query;
    const {
      name,
      username,
      avatar,
      account_name,
      is_account_admin,
      is_admin,
      email,
      password,
    } = req.body;

    if (userId && email) {
      await User.findByIdAndUpdate(userId, {
        name: name,
        username: username,
        avatar: avatar,
        account_name: account_name,
        is_account_admin: is_account_admin,
        is_admin: is_admin,
        email: email,
        password: await hash(password, 12),
      });
      return res.status(200).json({ success: "User Updated Successfully" });
    }
    return res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    return res.status(404).json({ error: "Error Updating User Data" });
  }
}
