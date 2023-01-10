export const addTask = async (boardId, sectionId) => {
  console.log(boardId, sectionId, "newTaskData from addTask");
  const newTaskData = {
    boardId: boardId,
    sectionId: sectionId,
  };
  //return console.log("stop");
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskData),
    };
    const response = await fetch(`/api/projects/tasks/`, Option);
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
