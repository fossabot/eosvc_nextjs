import Employee from "../../../model/Employee/Employee";

export async function getEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      res.status(200).json(employee);
    }

    res.status(404).json({ error: "Employee not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
