export async function addIndustry(formData) {
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/setup/industry", Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
