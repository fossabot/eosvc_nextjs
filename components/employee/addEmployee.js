export async function addEmployee(formData) {
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/employee", Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
