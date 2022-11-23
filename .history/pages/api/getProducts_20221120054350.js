// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const category = req.query.category;
  let products =
    (await Product.find({ category: category })) || (await Product.find());

  res.status(200).json(products);
};
export default connectDb(handler);
