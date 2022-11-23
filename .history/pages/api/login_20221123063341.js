// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  const { password, email } = JSON.parse(req.body);
  console.log(email, password);
  if (req.method === "POST") {
    let user = await User.findOne({ email: email });
    if (user) {
      if (CryptoJS.AES.decrypt(user.password, "secret key 123") === password) {
        res.status(200).json({
          success: true,
          email: email,
          username: username,
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
