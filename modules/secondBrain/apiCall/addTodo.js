export const addTodos = async (userId, title, description) => {
  const formData = { userId, title, description };
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/secondBrain/${userId}`,
      Option
    );
    const json = await response.json();
    return json;
  } catch (err) {
    alert(err);
  } finally {
    console.log("Todo added successfully");
  }
};
