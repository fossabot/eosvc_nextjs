export const updateTask = async (taskId, newData) => {
  //console.log(boardId, "boardId from updateTaskPosition");
  console.log(newPosition, "newData from updateTask");
  //return console.log("stop");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPosition),
    };
    const response = await fetch(`/api/projects/tasks/`, Option);
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
