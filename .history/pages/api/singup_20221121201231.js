// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};
export default connectDb(handler);
