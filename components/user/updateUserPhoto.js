export async function updateUserPhoto(userId, imageData) {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imageData),
    };
    const response = await fetch(`/api/user/profilePhoto/${userId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
