import Employee from "../../../model/Employee/Employee";

export async function deleteEmployee(req, res) {
  try {
    const { employeeId } = req.query;

    if (employeeId) {
      const employee = await Employee.findByIdAndDelete(employeeId);
      return res.status(200).json({ deleted: employeeId });
    }

    res.status(404).json({ error: "Employee Not Selected!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting Employee" });
  }
}
