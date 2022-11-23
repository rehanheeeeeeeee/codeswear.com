import Image from "next/image";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RemoveFromCart, selectBasket } from "../redux/cart";

const styles = {
  container: (bg) =>
    `flex items-center justify-between ${
      bg === "pink" ? "bg-pink-100" : "bg-white"
    } p-2 my-2 ${
      bg === "pink" ? "hover:bg-pink-200" : "hover:bg-gray-50"
    } transition ease-in duraction-100 hover:shadow-md shadow-sm rounded-md`,
  quantity: "text-pink-500 cursor-pointer text-lg",
};

export default function CartProduct({ item, bg }) {
  const dispatch = useDispatch();
  const { quantity, price, title, category, img } = item;
  return (
    <div className={styles.container(bg)}>
      <div className="flex items-center space-x-2">
        <Image
          src={img}
          width={1920}
          height={1080}
          className={`
          w-10 rounded-md object-contain`}
          alt="alt"
        />
        <div className="">
          {" "}
          <p className="text-base font-md">{category}</p>
          <p className="text-xs mb-1 text-gray-500 font-md">{title}</p>
          <p className="text-xs">
            <span className=" text-red-500 text-xs">$</span>
            {price}
          </p>
        </div>
      </div>
      <div className="mx-1 space-x-2 flex items-center">
        <span
          onClick={() => dispatch(RemoveFromCart(item.title))}
          className={styles.quantity}
        >
          <AiFillMinusCircle />
        </span>
        <span>{quantity}</span>
        <span
          onClick={() => dispatch(addToCart(item))}
          className={styles.quantity}
        >
          <AiFillPlusCircle />
        </span>
      </div>
    </div>
  );
}
