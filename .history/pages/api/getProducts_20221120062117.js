// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const category = req.query.category;
  let products = category
    ? await Product.find({ category: category })
    : await Product.find();
  // Will not be set to null upon another call to this API
  let items = {};
  products.forEach((product) => {
    if (product.title in items) {
      if (
        !items[product.title].color.includes(product.color) &&
        product.availableQty > 0
      ) {
        items[product.title].color.push(product.color);
      }
      if (
        !items[product.title].size.includes(product.size) &&
        product.availableQty > 0
      ) {
        items[product.title].size.push(product.size);
      }
    } else {
      items[product.title] = JSON.parse(JSON.stringify(product));
      if (product.availableQty > 0) {
        items[product.title].color = [product.color];
        items[product.title].size = [product.size];
      }
    }
  });

  res.status(200).json(items);
};
export default connectDb(handler);
