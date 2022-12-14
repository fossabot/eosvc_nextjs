export const getEmployee = async (employeeId) => {
  try {
    const response = await fetch(`/api/employee/${employeeId}`);
    const json = await response.json();
    console.log("Fetch single employee");
    if (json) return json;
    return {};
  } catch (error) {
    return error;
  }
};
