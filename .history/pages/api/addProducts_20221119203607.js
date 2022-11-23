// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // creating a new Product Document in my products
    // collection

    // Looping through the body array so that we can get
    // all of our products out and create documents for
    // them and add them to the collection

    for (let i = 0; i < array.length; i++) {}

    let p = new Product({
      title: req.body[i].title,
      slug: req.body[i].slug,
      desc: req.body[i].desc,
      img: req.body[i].img,
      category: req.body[i].category,
      size: req.body[i].size,
      color: req.body[i].color,
      price: req.body[i].price,
      availableQty: req.body[i].availableQty,
    });
    // Saving the document to our collection
    await p.save();
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
