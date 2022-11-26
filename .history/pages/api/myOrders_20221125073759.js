// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";

async function handler(req, res) {
  res.status(200).json();
}
export default connectDb(handler);
