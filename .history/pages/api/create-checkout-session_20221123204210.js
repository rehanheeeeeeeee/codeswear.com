const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default function handler(req, res) {
  if (req.method === "POST") {
    const { basket, email } = req.body;
    const transformedItems = basket.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: item.price * item.quantity * 100,
      },
    }));
  }
  res.status(200).json({ name: "John Doe" });
}
