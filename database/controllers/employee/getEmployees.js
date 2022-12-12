import Employee from "../../../model/Employee/Employee";

export async function getEmployees(req, res) {
  try {
    const employee = await Employee.find({});
    if (!employee) return res.status(404).json({ error: "Dta not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
