export async function deleteSection(sectionId) {
  console.log(sectionId, "sectionId from deleteSection API call");
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionId }),
    };
    const response = await fetch(`/api/projects/section/`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
