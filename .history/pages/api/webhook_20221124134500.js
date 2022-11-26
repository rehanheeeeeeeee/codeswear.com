// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { buffer } from "micro";
import mongoose from "mongoose";
import { BsTextIndentLeft } from "react-icons/bs";
import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";
import Product from "../../modals/Product";
// Using this webhook we will listen to specfic that
// our session triggered when the transaction is made on
// it

// In order to check if we have we are listening to the
// right event we need to verify the response using
// a certificate that stripe has setup in order for
// us to validate that we are getting the response
// from an actual strife event call.

// Connecting to Stripe
const stripe = require("stripe")(process.env.NEXT_PUBLIC_SECRET_KEY);

const endpointSecret = process.env.NEXT_PUBLIC_SIGNIN_SECRET;

const fullFillOrder = async (session) => {
  const { email, address, items } = session.metadata;
  const proData = await Product.find();
  const products = JSON.parse(items).map(async (item) => {
    const proData = await Product.findOne({ _id: item.id });
    console.log(proData);
    return {
      productId: item.id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    };
  });
  const order = new Order({
    email: email,
    orderId: session.id,
    amount: session.amount_total / 100,
    address: JSON.parse(address),
    products: products,
  });
  await order.save();
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Buffer will in parsing requests
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();

    // Checking if the request that we got from our
    // event listner is a valid stripe call

    // We check it by checking if there is a stripe
    // signature in our request

    const sig = req.headers["stripe-signature"];

    // Now someone fake can also give us signature in
    // the request for that we use built in functions
    // from stripe in order to check if it is a
    // authenticated signature

    let event;

    try {
      // verification
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      return res.status(400).send(`Webhook error : ${error.message}`);
    }

    // Now if the event that we listened was a valid
    // stripe event

    // We will make sure it is a call from the event
    // listner that we want to listen too which is the
    // checkout session completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      fullFillOrder(session);
    }
  }
}
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
