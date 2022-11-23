import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import OrderedProduct from "../components/OrderedProduct";
import { selectBasket, selectBasketTotal } from "../redux/cart";

const styles = {
  headings: "flex flex-items w-full justify-between p-2 text-pink-500 text-lg",
  heading: "flex-1 ",
  heading2: "mx-16 ",
};

const Headings = () => (
  <div className={styles.headings}>
    <div className={styles.heading}>Description</div>
    <div className={styles.heading2}>Quantity</div>
    <div>Price</div>
  </div>
);

export default function Orders() {
  const basket = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <div>
      <div className="mx-auto">
        <p className="md:text-[3vw] font-bold text-2xl w-full text-center">
          My Orders
        </p>
      </div>
    </div>
  );
}
