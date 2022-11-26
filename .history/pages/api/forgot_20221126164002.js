// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";

async function handler(req, res) {
  const {email} = JSON.parse(req.body);
  res.status(200).json({ name: "John Doe" });
}

export default connectDb(handler);
