export async function addAccount(formData) {
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/accounts", Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
