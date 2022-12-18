import User from "../../../model/User/User";

export async function addUser(req, res) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Data not provided!" });
    User.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error: "Error While Posting Data" });
  }
}
