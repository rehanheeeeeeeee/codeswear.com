import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectBasket } from "../redux/cart";
import CartProduct from "./CartProduct";

const styles = {
  container: "w-full my-6",
  header: "font-semibold",
};

export default function ReviewCart() {
  const basket = useSelector(selectBasket);
  return (
    <div className={styles.container}>
      <p className={styles.header}>2. Review Cart Items</p>
      {!basket ? (
        <div className="font-semibold text-center px-1 h-full flex justify-center flex-col">
          <p>Basket Is Empty Please Add a few Items to checkout</p>
          <div className="w-full flex items-center justify-center my-1">
            {" "}
            <AiOutlineShoppingCart className=" text-3xl text-pink-600" />
          </div>
        </div>
      ) : (
        basket?.map((item, index) => (
          <CartProduct key={index} item={item} bg={"pink"} />
        ))
      )}
    </div>
  );
}
