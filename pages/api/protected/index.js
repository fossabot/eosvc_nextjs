import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    //console.log("Session", JSON.stringify(session, null, 2));
    res.status(200).json({ content: "Protected content" });
  } else {
    // Not Signed in
    res.status(401).json({ error: "User not Authenticated" });
  }
  res.end();
};
