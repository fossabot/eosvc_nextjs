export const getUserId = async (userEmail) => {
  try {
    const response = await fetch(`/api/user/userEmail/${userEmail}`);
    const json = await response.json();
    //console.log(json, "json");
    console.log("Fetch single user");
    if (json) return json;
    return {};
  } catch (error) {
    return error;
  }
};
