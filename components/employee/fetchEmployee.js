export const getEmployee = async () => {
  console.log(process.env.APP_URL, "APP_URL");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.APP_URL}/api/employee`
  );
  const json = response.json();
  return json;
};
