import Head from "next/head";
import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import ReviewCart from "../components/ReviewCart";
import { selectBasketTotal } from "../redux/cart";

const styles = {
  container: "flex flex-col items-center p-4 w-full",
  header: "text-bold text-3xl my-8 text-center",
  button:
    "flex items-center space-x-2 mt-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 transition ease-in duration-100 rounded-3xl text-lg",
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script type="application/javascript" crossorigin="anonymous" src="script.js"></script> 
      <script type="application/javascript" crossorigin="anonymous" src="https://<%= data.env %>/merchantpgpui/checkoutjs/merchants/<%= data.mid %>.js"></script>  
      </Head>
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
          className={styles.button}
          onClick={() => router.push("/checkout")}
        >
          <BsBagCheckFill className="relative bottom-0.5" />
          <p>Checkout</p>
        </button>
      </div>
    </div>
  );
}
