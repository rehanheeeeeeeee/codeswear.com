import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");

async function handler(req, res) {
  if (req.method === "POST") {
    let { pinCode, addresstoken } = JSON.parse(req.body);
    // Gives Us back the data of the User.
    let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    let { username, email, address, pincode } = await User.findOneAndUpdate(
      {
        email: user.email,
      },
      {}
    );
    res.status(200).json({ username, email, address, pincode });
  } else {
    res.status(200).json({ error: "error" });
  }
}
export default connectDb(handler);
