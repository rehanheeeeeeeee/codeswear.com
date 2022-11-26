import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";
import Product from "../../modals/Product";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

async function handler(req, res) {
  // Confirming that the mehtod is a POST
  if (req.method === "POST") {
    // Getting the email and the basket out of the body

    const { basket, email, city, state, pinCode, address, phone, basketTotal } =
      req.body;

    if (phone.length < 8) {
      res.status(200).json({
        error:
          "Your Phone Number is Not Valid. Please provide a valid phone number",
      });
      return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const pincodes = await response.json();
    if (pinCode < 3 || !(pinCode in pincodes)) {
      res.status(200).json({ error: "Your Pincode Is Not Valid" });
    }

    // Checking to see the cart hasnt been tampered with insdie of our storage.
    let subTotal = 0;
    for (let i = 0; i < basket.length; i++) {
      let productDb = await Product.findOne({ _id: basket[i].id });
      subTotal += productDb.price * basket[i].quantity;
      if (productDb.price !== basket[i].price) {
        res.status(200).json({ error: "Basket Amounts Are Invalid" });
        return;
      }
      if (productDb.availableQty < basket[i].quantity) {
        res
          .status(200)
          .json({ error: "Some of the Items In your Cart Are out of Stock" });
        return;
      }
    }

    if (basketTotal !== subTotal.toFixed(2)) {
      res.status(200).json({ error: "Basket Amounts Are Invalid" });
      return;
    }

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
      success_url: `${process.env.NEXT_PUBLIC_HOST}/order?session=succeeded&email=${email}`,
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
