export async function updateUserPass(userId, newPass) {
  console.log(newPass, "newPass");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPass),
    };
    const response = await fetch(`/api/user/newPass/${userId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
