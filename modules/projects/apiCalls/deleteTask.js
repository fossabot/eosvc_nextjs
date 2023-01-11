export async function deleteTask(boardId, taskId) {
  console.log(boardId, "boardId from deleteTask API call");
  console.log(taskId, "taskId from deleteTask API call");
  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardId, taskId }),
    };
    const response = await fetch(`/api/projects/tasks/`, Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
