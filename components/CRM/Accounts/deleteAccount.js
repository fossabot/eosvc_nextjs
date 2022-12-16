export async function deleteAccount(accountId) {
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/accounts/${accountId}`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
