export const updateSection = async (boardId, sectionId, newTitle) => {
  console.log(boardId, sectionId, newTitle, "newData from updateSection");
  const { title } = newTitle;
  const updateData = {
    title: title,
    bordId: boardId,
    sectionId: sectionId,
  };
  console.log(title, "newTitle");
  //return console.log("stop");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    };
    const response = await fetch(
      `/api/projects/section/sectionId/${sectionId}`,
      Option
    );
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
