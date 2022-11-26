// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require("jsonwebtoken");

export default function handler(req, res) {
  if (req.method === "POST") {
    let token = req.body.token;
    // Gives Us back the data of the User.
    let user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  } else {
    res.status(400).json({ error: "error" });
  }
}
