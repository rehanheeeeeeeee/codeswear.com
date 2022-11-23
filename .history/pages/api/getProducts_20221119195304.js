// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async () => {};
export default async function handler(req, res) {
  let products = await Product.find();
  res.status(200).json();
}
