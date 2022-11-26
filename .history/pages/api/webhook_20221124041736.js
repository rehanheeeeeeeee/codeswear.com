// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { buffer } from "micro";
import Order from "../../modals/Order";
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

export default async function handler(req, res) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);

    res.status(200).json();
  }
}
