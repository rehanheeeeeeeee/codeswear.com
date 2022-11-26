import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import ReviewCart from "../components/ReviewCart";
import { clearCart, selectBasket, selectBasketTotal } from "../redux/cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
const styles = {
  container: "flex flex-col items-center p-4 w-full",
  header: "text-bold text-3xl my-8 text-center",
  button: (disabled) =>
    `flex items-center space-x-2 mt-5 text-white border-0 py-2 px-4 focus:outline-none ${
      disabled ? "bg-pink-200" : "bg-pink-500 hover:bg-pink-600"
    } transition ease-in duration-100 rounded-3xl text-lg`,
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const buttonRef = useRef();
  const [disabled, setDisabled] = useState(
    !name || !email || !address || !phone || !city || !state || !pinCode
  );

  useEffect(() => {
    setDisabled(
      !(name.length > 3) ||
        !(email.length > 3) ||
        !(address.length > 3) ||
        !(phone.length === 8) ||
        !(city.length > 3) ||
        !(state.length > 3) ||
        !(pinCode.length >= 3)
    );
  }, [name, email, address, phone, city, state, pinCode]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "pinCode":
        setPinCode(value);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
        );
        const data = await response.json();
        if (value in data) {
          setState(data[value][0]);
          setCity(data[value][1]);
        } else {
          setState("");
          setCity("");
        }
        break;

      case "address":
        setAddress(value);
        break;

      default:
        break;
    }
  };
  // console.log(buttonRef);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // Making a post request to backend to create a session id with the current items in their basket and there email
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      basket,
      email,
      basketTotal,
      pinCode,
      city,
      state,
      phone,
      address,
    });
    if (checkoutSession.data.error) {
      toast.error(data.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (checkoutSession.data.id) {
      // Redirecting the user to that session id.
      await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
    }
  };
  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className={styles.header}>Checkout</p>
      <CheckoutForm
        name={name}
        email={email}
        phone={phone}
        pinCode={pinCode}
        city={city}
        state={state}
        address={address}
        handleChange={handleChange}
      />
      <ReviewCart />
      <p className="w-full text-base text-start">
        Subtotal:{" "}
        <span className="font-semibold text-medium">
          <span className="text-sm text-red-500">₹</span>
          {basketTotal}
        </span>
      </p>
      <div className="w-full">
        <button
          ref={buttonRef}
          role={"link"}
          disabled={disabled}
          className={styles.button(disabled)}
          onClick={createCheckoutSession}
        >
          <BsBagCheckFill className="relative bottom-0.5" />
          <p>Checkout</p>
        </button>
      </div>
    </div>
  );
}
