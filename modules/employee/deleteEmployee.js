export async function deleteEmployee(employeeId) {
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/employee/${employeeId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
