import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function editAccount(req, res) {
  try {
    const { accountId } = req.query;
    const formData = req.body;

    if (accountId && formData) {
      await Accounts.findByIdAndUpdate(accountId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "Account Not Selected ... !" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating Account Data" });
  }
}
