export const getUser = async (employeeId) => {
  try {
    const response = await fetch(`/api/user/${userId}`);
    const json = await response.json();
    console.log("Fetch single user");
    if (json) return json;
    return {};
  } catch (error) {
    return error;
  }
};
