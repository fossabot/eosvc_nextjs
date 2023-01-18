export const getImages = async () => {
  try {
    const response = await fetch(`/api/documents/images`);
    const json = await response.json();
    console.log("Fetch all Images");
    return json;
  } catch (error) {
    return error;
  }
};
