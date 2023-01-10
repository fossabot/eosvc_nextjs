export const createSection = async (boardId) => {
  const formData = { boardId };
  try {
    console.log("createSection");
    console.log(formData, "formData Section");
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/projects/section", Option);
    const json = await response.json();
    return json;
  } catch (err) {
    alert(err);
  }
};
