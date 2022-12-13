export async function addEmployee(employeeId) {
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/employees/${employeeId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
