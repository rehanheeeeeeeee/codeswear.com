import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
async function handler(req, res) {
  if (req.method === "POST") {
    let body = JSON.parse(req.body);
    // Gives Us back the data of the User.
    let user = jwt.verify(body.token, process.env.NEXT_PUBLIC_JWT_KEY);
    let decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.NEXT_PUBLIC_JWT_KEY
    );
    console.log(decryptedPass);
    if (decryptedPass === body.oldPassword) {
      await User.findOneAndUpdate(
        {
          email: user.email,
        },
        {
          password: CryptoJS.AES.encrypt(
            body.password,
            process.env.NEXT_PUBLIC_JWT_KEY
          ).toString(),
        }
      );
      res
        .status(200)
        .json({ success: true, message: "Successfully Updated Password" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Old Password is Not Correct" });
    }
  } else {
    res.status(200).json({ error: "error" });
  }
}
export default connectDb(handler);
