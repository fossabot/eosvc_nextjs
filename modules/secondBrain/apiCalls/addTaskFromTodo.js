export const addTaskFromTodo = async (boardId, sectionId, content) => {
  const newTaskData = {
    boardId: boardId,
    sectionId: sectionId,
    content: content,
  };
  console.log(newTaskData, "newTaskData");
  //return console.log("stop");
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskData),
    };
    const response = await fetch(`/api/secondBrain/boardId`, Option);
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
