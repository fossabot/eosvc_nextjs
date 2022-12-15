import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function getAccounts(req, res) {
  try {
    const accounts = await Accounts.find({});
    if (!accounts)
      return res.status(404).json({ error: "Accounts Data not found" });
    res.status(200).json(accounts);
    res.end();
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Accounts Data" });
  }
}
