export async function addInvoice(invoiceData) {
  //return console.log(invoiceData, "invoiceData");
  try {
    const Option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    };
    const response = await fetch("/api/invoice", Option);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
