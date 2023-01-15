export const getAllUserBoards = async (userId) => {
  console.log(userId, "userId");
  if (!userId) {
    console.log("No userId");
    return;
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/boards/${userId}`
      );
      const json = await response.json();
      console.log("Fetch all User Projects(Boards)");
      return json;
    } catch (error) {
      return error;
    }
  }
};
