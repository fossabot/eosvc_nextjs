export const updateBoardVisibility = async (boardId, visibility) => {
  console.log(boardId, "Board ID from updateBoardFavourite");
  console.log(visibility, "Visibility from updateBoardFavourite");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardId, visibility }),
    };
    const response = await fetch(`/api/projects/boards/visibility`, Option);
    const json = await response.json();
    console.log("Updating Board Visibility - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
