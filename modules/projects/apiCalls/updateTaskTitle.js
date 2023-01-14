export const updateTaskTitle = async (taskId, newTitle) => {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, newTitle }),
    };
    const response = await fetch(`/api/projects/tasks/`, Option);
    const json = await response.json();
    console.log("Updating task Title - Tasks");
    return json;
  } catch (error) {
    return error;
  }
};
