export async function updateEmployee(employeeId, formData) {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`/api/employee/${employeeId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
