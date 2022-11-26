// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Forgot from "../../modals/Forgot";
import User from "../../modals/User";
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

async function handler(req, res) {
  const { email, password, sendMail, token } = JSON.parse(req.body);
  const mailTransporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "rehantosif4@gmail.com",
      pass: process.env.NEXT_PUBLIC_PASSWORD,
    },
    secure: true,
  });

  if (sendMail) {
    let token = uuidv4();

    const doc = new Forgot({
      email,
      token,
    });

    await doc.save();

    const user = await User.findOne({ email: email });

    let details = {
      from: "rehantosif4@gmail.com",
      to: email,
      subject: "Password Reset Email From Codewear",
      html: `<p>Hi ${user.username},
      <br/>
      There was a request to change your password!
      <br/>
      If you did not make this request then please ignore this email.
      <br/>
      Otherwise, please click this link to change your password: <a href=${`${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}`}>${`${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}`}</a>
      <br/>
      Thank you..
      </p>`,
    };

    mailTransporter.sendMail(details, (error) => {
      if (error) {
        console.log(error);
        res.status(200).json({ success: false });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } else {
    const entry = await Forgot.findOne({ token: token });
    if (entry) {
      const user = await User.findOne({ email: entry.email });
      if (user) {
        await User.findOneAndUpdate(
          { email: entry.email },
          {
            password: CryptoJS.AES.encrypt(
              password,
              process.env.NEXT_PUBLIC_JWT_KEY
            ),
          }
        );
      } else {
        res
          .status(200)
          .json({ success: false, message: "User Does Not Exists" });
      }
      res.status(200).json({
        success: true,
        message: "Your Password has been Successfully Reset",
      });
    } else {
      res.status(200).json({ success: false, message: "Invalid Token" });
    }
  }
}

export default connectDb(handler);
