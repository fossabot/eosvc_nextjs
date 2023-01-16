export const getAllTodos = async (userId) => {
  console.log(userId, "userId");
  if (!userId) {
    console.log("No userId");
    return;
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/secondBrain/${userId}`
      );
      const json = await response.json();
      console.log("Fetch all User SecondBrain Todos");
      return json;
    } catch (error) {
      return error;
    }
  }
};
