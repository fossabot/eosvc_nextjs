export const updateTask = async (taskId, newContent) => {
  try {
    const Option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, newContent }),
    };
    const response = await fetch(`/api/projects/tasks/content/`, Option);
    const json = await response.json();
    console.log("Updating task Content - Tasks");
    return json;
  } catch (error) {
    return error;
  }
};
