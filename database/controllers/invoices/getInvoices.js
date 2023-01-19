import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

import Invoices from "../../../model/Invoices/invoice";

export async function getInvoices(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const invoices = await Invoices.find({});
      if (!invoices)
        return res.status(404).json({ error: "Invoices data not found" });
      return res.status(200).json(invoices);
    } catch (error) {
      res.status(404).json({ error: "Error While Fetching Invoices Data" });
    }
  } else {
    // Not Signed in
    return res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
