import setupIndustry from "../../../../model/CRM/Setup/Industry/Industry";

export async function addIndustry(req, res) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Data not provided!" });
    setupIndustry.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Posting Data" });
  }
}
