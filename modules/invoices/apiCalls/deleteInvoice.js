export const deleteInvoice = async (mutationData) => {
  //console.log(invoiceId, "invoiceId API call");

  try {
    const Option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mutationData),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/invoice/`,
      Option
    );
    const json = await response.json();
    return json;
  } catch (err) {
    alert(err);
  } finally {
    console.log("Todo delete successfully");
  }
};
