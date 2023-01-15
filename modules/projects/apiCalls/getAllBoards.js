export const getAllBoards = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/boards/`
    );
    const json = await response.json();
    console.log("Fetch all User Projects(Boards)");
    return json;
  } catch (error) {
    return error;
  }
};
