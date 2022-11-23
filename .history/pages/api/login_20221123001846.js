// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  if (req.method === "POST") {
    let user = await User.findOne({ email: body.email });
    if (user) {
      if (body.password === user.password) {
        res.status(200).json({
          success: true,
          email: user.email,
          username: user.username,
        });
      } else {
        res.status(400).json({ success: false, error: "Invalud Credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "No User Found" });
    }
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};
export default connectDb(handler);
