// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        req.body.email === user.email &&
        req.body.password === user.password
      ) {
        res
          .status(200)
          .json({
            success: "success",
            email: user.email,
            username: user.username,
          });
      }
    }
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};
export default connectDb(handler);
