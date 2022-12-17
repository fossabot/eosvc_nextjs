import setupIndustry from "../../../../model/CRM/Setup/Industry/Industry";

export async function getIndustry(req, res) {
  try {
    const industry = await setupIndustry.find({});
    if (!industry) return res.status(404).json({ error: "Dta not found" });
    res.status(200).json(industry);
    res.end();
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
