// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    let token = JSON.stringify(req.body).token;
    // Gives Us back the data of the User.
    let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
    res.status(200).json({ user: user });
  } else {
    res.status(200).json({ error: "error" });
  }
}
