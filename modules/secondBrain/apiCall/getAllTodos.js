export const getAllTodos = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/secondBrain/`
    );
    const json = await response.json();
    console.log("Fetch all User SecondBrain Todos");
    return json;
  } catch (error) {
    return error;
  }
};
