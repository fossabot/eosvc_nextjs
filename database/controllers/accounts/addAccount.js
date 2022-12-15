import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function addAccount(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Account Data not provided!" });
    Accounts.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Posting Account Data" });
  }
}
