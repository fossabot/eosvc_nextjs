export const getUsers = async () => {
  try {
    const response = await fetch(`/api/user`);
    const json = await response.json();
    console.log("Fetch all users");
    return json;
  } catch (error) {
    return error;
  }
};
