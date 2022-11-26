import React, { useEffect, useRef, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import ReviewCart from "../components/ReviewCart";
import { clearCart, selectBasket, selectBasketTotal } from "../redux/cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { selectUser } from "../redux/user";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
const styles = {
  container: "flex flex-col items-center p-4 w-full",
  header: "font-bold text-3xl md:text-[4vw] my-8 text-center",
  button: `flex items-center space-x-2 mt-5 text-white border-0 py-2 px-4 focus:outline-none 
    disabled:bg-pink-200 bg-pink-500 hover:bg-pink-600
     transition ease-in duration-100 rounded-3xl text-lg`,
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const buttonRef = useRef();
  const [disabled, setDisabled] = useState(
    !basket.length ||
      !name ||
      !email ||
      !address ||
      !phone ||
      !city ||
      !state ||
      !pinCode
  );

  useEffect(() => {
    setDisabled(
      !basket.length ||
        !(name.length > 3) ||
        !(email.length > 12) ||
        !address.length ||
        !phone.length ||
        !city.length ||
        !state.length ||
        !pinCode.length
    );
  }, [name, email, address, phone, city, state, pinCode, basket]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
        method: "POST",
        body: JSON.stringify({
          token: user.token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.username);
          handleChange({ target: { name: "pinCode", value: data.pincode } });
          setPhone(data.phone);
          setAddress(data.address);
        });
    }
  }, [user]);

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

      case "city":
        setCity(value);
        break;

      case "state":
        setState(value);
        break;

      case "address":
        setAddress(value);
        break;

      default:
        break;
    }
  };

  const createCheckoutSession = async () => {
    setProcessing(true);
    const stripe = await stripePromise;
    // Making a post request to backend to create a session id with the current items in their basket and there email
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      basket: basket,
      name,
      email,
      basketTotal,
      pinCode,
      city,
      state,
      phone,
      address,
    });
    if (checkoutSession.data.error) {
      toast.error(`${checkoutSession.data.error}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (checkoutSession.data.error === "Basket Amounts Are Invalid") {
        dispatch(clearCart());
      }
    } else if (checkoutSession.data.id) {
      // Redirecting the user to that session id.
      await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
    }
    setProcessing(false);
  };
  return (
    <div className={styles.container}>
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
          className={styles.button}
          onClick={createCheckoutSession}
        >
          <BsBagCheckFill className="relative bottom-0.5" />
          <p>{processing ? "Processing" : "Checkout"}</p>
        </button>
      </div>
    </div>
  );
}
