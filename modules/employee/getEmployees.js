export const getEmployees = async () => {
  try {
    const response = await fetch(`/api/employee`);
    const json = await response.json();
    console.log("Fetch all employee");
    return json;
  } catch (error) {
    return error;
  }
};
