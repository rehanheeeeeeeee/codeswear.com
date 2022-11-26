const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default function handler(req, res) {
  if (req.method === "POST") {
    const { basket, email } = JSON.parse(req.body);
  }
  res.status(200).json({ name: "John Doe" });
}
