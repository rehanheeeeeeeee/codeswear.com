const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { basket, email } = req.body;
    const transformedItems = basket.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: item.price * item.quantity * 100,
        product_data: {
          name: `${item.title} (${size}/${color})`,
          images: [img],
        },
      },
    }));
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_tyoes: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
  });
}
