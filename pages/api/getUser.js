import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");

async function handler(req, res) {
  if (req.method === "POST") {
    let token = JSON.parse(req.body).token;
    // Gives Us back the data of the User.
    let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    let { username, email, address, pincode,phone } = await User.findOne({
      email: user.email,
    });
    res.status(200).json({ username, email, address, phone,pincode });
  } else {
    res.status(200).json({ error: "error" });
  }
}
export default connectDb(handler);
