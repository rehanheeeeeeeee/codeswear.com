// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jsonWebTokenError from "jsonwebtoken";
import connectDb from "../../middleware/mongoose";

async function handler(req, res) {
  let { token } = req.body;
  const { email } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  let orders = await Order.find({ email: email });
  res.status(200).json({ orders });
}
export default connectDb(handler);
