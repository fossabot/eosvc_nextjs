export const updateBoardFavourite = async (boardId, favourite) => {
  console.log(boardId, "Board ID from updateBoardFavourite");
  console.log(favourite, "favourite");
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardId, favourite }),
    };
    const response = await fetch(`/api/projects/boards/favourite`, Option);
    const json = await response.json();
    console.log("Updating Board Favourite - Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
