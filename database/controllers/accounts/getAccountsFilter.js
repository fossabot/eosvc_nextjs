import Accounts from "../../../model/CRM/Accounts/Accounts";

export async function getAccountsFilter(req, res) {
  try {
    //const { search } = req.query;
    const search = req.query.search;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    let sort = req.query.sort || "name";
    let filter = req.query.filter || "All";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    console.log(page, "page");
    console.log(limit, "limit");

    const accounts = await Accounts.find({
      name: { $regex: search, $options: "i" },
    })
      .sort(sortBy)
      .limit(limit);

    if (!accounts)
      return res.status(404).json({ error: "Accounts Data not found" });
    console.log(accounts.length);
    res.status(200).json(accounts);
    res.end();
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Accounts Data" });
  }
}
