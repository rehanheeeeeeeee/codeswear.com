// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { JsonWebTokenError } from "jsonwebtoken";
import connectDb from "../../middleware/mongoose";

async function handler(req, res) {
  let { token } = req.body;
  const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
}
export default connectDb(handler);
