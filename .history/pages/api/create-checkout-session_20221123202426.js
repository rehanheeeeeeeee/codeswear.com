const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default function handler(req, res) {
  if (req.method === "POST") {
    const { basket, email } = JSON.parse(req.body);
    console.log(basket, email);
  }
  res.status(200).json({ name: "John Doe" });
}
