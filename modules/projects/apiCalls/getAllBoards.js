export const getAllBoards = async (userId) => {
  console.log(userId, "userId");
  try {
    const response = await fetch(`/api/projects/boards/${userId}`);
    const json = await response.json();
    console.log("Fetch all User Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
