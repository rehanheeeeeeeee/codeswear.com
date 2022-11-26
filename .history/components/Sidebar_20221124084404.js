import { Router, useRouter } from "next/router";
import React from "react";
import {
  AiFillCloseCircle,
  AiOutlineClear,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectBasket, selectBasketTotal } from "../redux/cart";
import { selectOpenSideCart, setOpenSideCart } from "../redux/sidebar";
import CartProduct from "./CartProduct";

const styles = {
  sidebar: (openSideCart) =>
    `fixed z-10 top-0 right-0 transition-transform ease-in ${
      openSideCart ? "transalte-x-0 " : "translate-x-full "
    } bg-pink-100 bottom-0 duration-200 px-3 py-10 w-72 flex flex-col`,
  header: "font-semibold text-lg w-full text-center",
  close:
    "absolute top-4 right-2 text-2xl hover:text-pink-700 cursor-pointer text-pink-600",
  button:
    "flex items-center space-x-2 mt-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 transition ease-in duration-100 rounded-3xl text-lg",
};

export default function Sidebar() {
  const openSideCart = useSelector(selectOpenSideCart);
  const dispatch = useDispatch();
  let basket = useSelector(selectBasket);
  let router = useRouter();
  console.log(basket);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <div className={styles.sidebar(openSideCart)}>
      <p className={styles.header}>Shopping Cart</p>
      <AiFillCloseCircle
        onClick={() => dispatch(setOpenSideCart())}
        className={styles.close}
      />

      <div className="flex-1 my-3 overflow-x-scroll scrollbar-hide flex-col items-center justify-center">
        {!basket ? (
          <div className="font-semibold text-center px-1 h-full flex justify-center flex-col">
            <p>Basket Is Empty Please Add a few Items to checkout</p>
            <div className="w-full flex items-center justify-center my-1">
              {" "}
              <AiOutlineShoppingCart className=" text-3xl text-pink-600" />
            </div>
          </div>
        ) : (
          basket?.map((item, index) => <CartProduct key={index} item={item} />)
        )}
      </div>
      <p className="w-full text-base text-start">
        Subtotal:{" "}
        <span className="font-semibold text-medium">
          <span className="text-sm text-red-500">$</span>
          {basketTotal}
        </span>
      </p>
      <div className="flex items-center w-full justify-between">
        <button
          className={styles.button}
          onClick={() => router.push("/checkout")}
        >
          <BsBagCheckFill className="relative bottom-0.5" />
          <p>Checkout</p>
        </button>
        <button onClick={() => dispatch(clearCart())} className={styles.button}>
          <AiOutlineClear className="relative bottom-0.5" />
          <p>Clear</p>
        </button>
      </div>
    </div>
  );
}
