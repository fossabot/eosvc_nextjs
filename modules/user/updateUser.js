export async function updateUser(userId, formData) {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`/api/user/${userId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
