export async function deleteProject(boardId) {
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `/api/projects/boards/boardId/${boardId}`,
      Option
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
