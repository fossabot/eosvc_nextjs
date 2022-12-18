import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function getAccount(req, res) {
  try {
    const { accountId } = req.query;
    if (accountId) {
      const account = await Accounts.findById(accountId);
      return res.status(200).json(account);
    }

    return res.status(404).json({ error: "Account not selected" });
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Account Data" });
  }
}
