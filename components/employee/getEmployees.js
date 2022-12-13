export const getEmployees = async () => {
  const response = await fetch(`/api/employee`);
  const json = response.json();
  return json;
};
