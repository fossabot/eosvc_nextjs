import Employee from "../../../model/Employee/Employee";

export async function addEmployee(req, res) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Data not provided!" });
    Employee.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error While Posting Data" });
  }
}
