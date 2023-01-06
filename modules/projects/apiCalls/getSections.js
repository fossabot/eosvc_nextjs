export const getSections = async (boardId) => {
  console.log(boardId, "boardId from getSections");
  try {
    const response = await fetch(`/api/projects/section/${boardId}`);
    const json = await response.json();
    console.log("Fetch all Sections asigned to Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
