import User from "../../modals/User";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    let token = JSON.parse(req.body).token;
    // Gives Us back the data of the User.
    let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    console.log(user);
    let dbuser = await User.findOne({ email: user.email });
    res.status(200).json({ user: dbuser });
  } else {
    res.status(200).json({ error: "error" });
  }
}
