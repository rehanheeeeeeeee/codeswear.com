// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const category = req.query.category;
  let products = category
    ? await Product.find({ category: category })
    : await Product.find();
  let items = {};

  products.forEach((product) => {
    if (product.title in items) {
    } else {
      items[product.title] = JSON.parse(JSON.stringify(product));
      items[product.title];
    }
  });

  res.status(200).json(products);
};
export default connectDb(handler);
