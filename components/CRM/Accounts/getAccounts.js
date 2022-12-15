export const getAccounts = async () => {
  try {
    const response = await fetch(`/api/accounts`);
    const json = await response.json();
    console.log("Fetch all Accounts");
    return json;
  } catch (error) {
    return error;
  }
};
