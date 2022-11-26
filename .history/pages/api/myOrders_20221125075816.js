// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";
var jwt = require("jsonwebtoken");
async function handler(req, res) {
  let { token } = req.body;
  console.log(token);
  const { email } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  let orders = await Order.find({ email: email });
  res.status(200).json({ orders });
}
export default connectDb(handler);
