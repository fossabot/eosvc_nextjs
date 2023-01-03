import { hash } from "bcryptjs";
import Users from "../../../model/User/User";

export async function updateUser(req, res) {
  console.log(req.query, "query");
  console.log(req.body, "body");
  try {
    const { userId } = req.query;
    const { name, username, avatar, account_name, is_account_admin, is_admin } =
      req.body;

    if (userId) {
      console.log("Updating User Data");
      await Users.findByIdAndUpdate(userId, {
        name: name,
        username: username,
        avatar: avatar,
        account_name: account_name,
        is_account_admin: is_account_admin,
        is_admin: is_admin,
      });
      return res.status(200).json({ success: "User Updated Successfully" });
    }
    return res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    return res.status(404).json({ error: "Error Updating User Data" });
  }
}
