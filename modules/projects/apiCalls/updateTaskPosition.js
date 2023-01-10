export const updateTaskPosition = async (boardId, newPosition) => {
  //console.log(boardId, "boardId from updateTaskPosition");
  console.log(newPosition, "newPosition from updateTaskPosition");
  //return console.log("stop");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPosition),
    };
    const response = await fetch(`/api/projects/tasks/position/`, Option);
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
