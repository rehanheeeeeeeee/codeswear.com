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

    for (let i = 0; i < req.body.length; i++) {
      // Saving the document to our collection
      await Product.findByIdAndUpdate(req.body[0].id, req.body[i]);
    }
    res.status(200).json({ success: "Product Added" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
