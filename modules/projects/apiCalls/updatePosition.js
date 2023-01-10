export const updatePosition = async (newPosition) => {
  console.log(newPosition, "boardId from getSections");
  //return console.log("stop");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPosition),
    };
    const response = await fetch(
      `/api/projects/boards/position/${boardId}`,
      Option
    );
    const json = await response.json();
    console.log("Updating positions - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
