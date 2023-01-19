import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

import Invoice from "../../../model/Invoices/Invoice";

export async function deleteInvoice(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    console.log(req.body, "req.body");
    const invoiceId = req.body;
    //return console.log(invoiceId, "invoiceId");
    try {
      const invoice = await Invoice.deleteOne({ _id: invoiceId });
      res.status(200).json(invoice);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Not Signed in
    res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
