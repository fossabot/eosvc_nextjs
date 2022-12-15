import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function deleteAccount(req, res) {
  try {
    const { accountId } = req.query;

    if (accountId) {
      const account = await Accounts.findByIdAndDelete(accountId);
      return res.status(200).json({ deleted: accountId });
    }

    res.status(404).json({ error: "Account Not Selected!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting Account" });
  }
}
