import Employee from "../../../model/Employee/Employee";

export async function editEmployee(req, res) {
  try {
    const { employeeId } = req.query;
    const formData = req.body;

    if (employeeId && formData) {
      await Employee.findByIdAndUpdate(employeeId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: "User Not Selected ... !" });
  } catch (error) {
    res.status(404).json({ error: "Error Updating Data" });
  }
}
