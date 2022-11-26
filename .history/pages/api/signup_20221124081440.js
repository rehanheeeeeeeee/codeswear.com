// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  const { username, email, password } = JSON.parse(req.body);
  if (req.method === "POST") {
    try {
      const user = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, "secret key 123").toString(),
      });
      await user.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({success: false;, error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};
export default connectDb(handler);
