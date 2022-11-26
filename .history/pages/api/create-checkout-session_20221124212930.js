import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

async function handler(req, res) {
  // Confirming that the mehtod is a POST
  if (req.method === "POST") {
    const { basket, email, city, state, pinCode, address, phone, basketTotal } =
      req.body;
    // Getting the email and the basket out of the body

    // Tranforming the items data inside of the basket into something that stripe understands
    const transformedItems = basket.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "inr",
        unit_amount: Math.floor(item.price * 100),
        product_data: {
          name: `${item.title} (${item.size}/${item.color})`,
          images: [item.img],
        },
      },
    }));
    // Creating a session to which im going to send my user too

    /* We are sending the items we want stripe to charge the user for. 
      The success url and cancel url*/

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      successUrl: `${process.env.NEXT_PUBLIC_HOST}/order?session=succeeded`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout?session=cancelled`,
    });
    const order = new Order({
      email: email,
      orderId: session.id,
      amount: basketTotal,
      address: { city, pinCode, address, state },
      products: basket,
    });
    await order.save();
    // Aftering finishing creating the session i need to send the ID as a response to frontend
    res.status(200).json({ id: session.id });
  }
}
export default connectDb(handler);
