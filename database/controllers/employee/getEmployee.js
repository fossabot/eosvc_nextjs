import Employee from "../../../model/Employee/Employee";

export async function getEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      return res.status(200).json(employee);
    }

    return res.status(404).json({ error: "Employee not selected" });
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Data" });
  }
  res.end();
}
