const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
