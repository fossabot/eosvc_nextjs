export const getBoard = async (boardId) => {
  console.log(boardId, "getBoard - boardId");
  if (!boardId) {
    console.log("No boardId");
    return;
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/boards/boardId/${boardId}`
      );
      const json = await response.json();
      console.log("Get one Board - Projects(Boards)");
      return json;
    } catch (error) {
      return error;
    }
  }
};
