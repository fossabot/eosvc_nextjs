export const createBoard = async (userId, title, description) => {
  const formData = { userId, title, description };
  try {
    console.log("createBoard");
    console.log(formData, "formData");
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api/projects/boards", Option);
    const json = await response.json();
    return json;
  } catch (err) {
    alert(err);
  } finally {
  }
};
