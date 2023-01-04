export const getAccount = async (accountId) => {
  try {
    const response = await fetch(`/api/accounts/${accountId}`);
    const json = await response.json();
    console.log("Fetch single account");
    if (json) return json;
    return {};
  } catch (error) {
    return error;
  }
};
