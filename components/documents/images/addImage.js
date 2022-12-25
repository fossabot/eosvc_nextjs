export async function addImage(imageData) {
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imageData),
    };
    const response = await fetch("/api/documents/images", Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
