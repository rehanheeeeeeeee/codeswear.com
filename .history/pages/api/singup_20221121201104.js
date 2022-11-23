// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const category = req.query.category;
  const slug = req.query.slug;
  let products = category
    ? await Product.find({ category: category })
    : slug
    ? await Product.find({ slug: slug })
    : await Product.find();
  // Will not be set to null upon another call to this API
  let items = {};
  res.status(200).json(items);
};
export default connectDb(handler);
