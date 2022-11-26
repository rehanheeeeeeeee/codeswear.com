import { useRouter } from "next/router";
import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import ReviewCart from "../components/ReviewCart";
import { selectBasketTotal } from "../redux/cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
const styles = {
  container: "flex flex-col items-center p-4 w-full",
  header: "text-bold text-3xl my-8 text-center",
  button:
    "flex items-center space-x-2 mt-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 transition ease-in duration-100 rounded-3xl text-lg",
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post;
  };
  return (
    <div className={styles.container}>
      <p className={styles.header}>Checkout</p>
      <CheckoutForm />
      <ReviewCart />
      <p className="w-full text-base text-start">
        Subtotal:{" "}
        <span className="font-semibold text-medium">
          <span className="text-sm text-red-500">$</span>
          {basketTotal}
        </span>
      </p>
      <div className="w-full">
        <button
          role={"link"}
          className={styles.button}
          onClick={createCheckoutSession}
        >
          <BsBagCheckFill className="relative bottom-0.5" />
          <p>Checkout</p>
        </button>
      </div>
    </div>
  );
}
