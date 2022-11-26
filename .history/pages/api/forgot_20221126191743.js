// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Forgot from "../../modals/Forgot";
import User from "../../modals/User";

async function handler(req, res) {
  const { email, password, sendMail, token } = JSON.parse(req.body);

  if (sendMail) {
    let token = "323233232333";

    const doc = new Forgot({
      email,
      token,
    });

    await doc.save();

    let emailText = `
    Hi ${email},
    /n
    There was a request to change your password!
    /n
    If you did not make this request then please ignore this email.
    /n
    Otherwise, please click this link to change your password: <a href=${`${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}`}>${`${process.env.NEXT_PUBLIC_HOST}/forgotpassword?token=${token}`}</a>
    /n
    Thank you..
    `;

    res.status(200).json({ name: "John Doe" });
  } else {
    const entry = await Forgot.findOne({ token: token });
    if (entry) {
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
      res.status(200).json({ success: false, message: "Invalid Token" });
    }
  }
}

export default connectDb(handler);
