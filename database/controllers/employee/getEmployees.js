import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

import Employee from "../../../model/Employee/Employee";

export async function getEmployees(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const employee = await Employee.find({});
      if (!employee) return res.status(404).json({ error: "Dta not found" });
      return res.status(200).json(employee);
    } catch (error) {
      res.status(404).json({ error: "Error While Fetching Data" });
    }
    //res.status(200).json({ content: "Protected content" });
  } else {
    // Not Signed in
    res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
}
