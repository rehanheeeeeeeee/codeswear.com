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

export default function Orders() {
  const basket = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <div>
      <div className="mx-auto p-5">
        <p className="md:text-[4vw] font-bold text-3xl w-full text-center">
          My Orders
        </p>
      </div>
    </div>
  );
}
