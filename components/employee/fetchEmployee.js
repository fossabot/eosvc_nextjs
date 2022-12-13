export const getEmployees = async (employeeId) => {
  const response = await fetch(`/api/employee/${employeeId}`);
  const json = response.json();

  if (json) return json;
  return {};
};
