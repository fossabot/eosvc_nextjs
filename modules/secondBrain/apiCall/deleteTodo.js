export const deleteTodo = async (todoId) => {
  console.log(todoId, "todoId API call");

  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoId),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/secondBrain/todoId/${todoId}`,
      Option
    );
    const json = await response.json();
    return json;
  } catch (err) {
    alert(err);
  } finally {
    console.log("Todo delete successfully");
  }
};
