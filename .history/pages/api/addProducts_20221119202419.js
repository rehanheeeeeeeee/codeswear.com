// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
  } else {
    res.status(400).json({error:'This method is not allowed'})
  }
};
export default connectDb(handler);
