export const getAllInvoices = async () => {
  try {
    const response = await fetch(`/api/invoice`);
    const json = await response.json();
    console.log("Fetch all Invoices");
    return json;
  } catch (error) {
    return error;
  }
};
