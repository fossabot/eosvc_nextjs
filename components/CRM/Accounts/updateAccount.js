export async function updateAccount(accountId, formData) {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`/api/accounts/${accountId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
