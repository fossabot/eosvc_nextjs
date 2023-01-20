import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

import Invoice from "../../../model/Invoices/Invoice";

export async function addInvoice(req, res) {
  //const session = await unstable_getServerSession(req, res, authOptions);
  const session = true;
  if (session) {
    try {
      //console.log(req.body, "req");
      const body = req.body;
      const invoiceData = {
        invoice_file: body.invoice_file,
      };
      console.log(invoiceData, "invoiceData");
      console.log(invoiceData.invoice_file, "invoiceData.invoice_file");
      const invoice = await Invoice.create({
        invoice_file: invoiceData.invoice_file,
      });
      return res.status(200).json(invoice);
      invoice.save();

      if (!invoice)
        return res.status(404).json({ error: "Invoice data not found" });
      return res
        .status(200)
        .json({ message: "New Invoice successfully uploaded!" });
    } catch (error) {
      res.status(404).json({ error: "Error While Fetching Invoice Data" });
    }
  } else {
    // Not Signed in
    return res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
