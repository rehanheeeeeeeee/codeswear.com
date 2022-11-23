// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

export default function handler(req, res) {
  let products = Product.find();
  res.status(200).json();
}
