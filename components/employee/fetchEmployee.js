export const getEmployee = async () => {
  const response = await fetch(`${process.env.APP_URL}/api/employee`);
  const json = response.json();
  return json;
};
