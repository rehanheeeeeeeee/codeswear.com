// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  console.log(req.body);
  if (req.method === "POST") {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};
export default connectDb(handler);
