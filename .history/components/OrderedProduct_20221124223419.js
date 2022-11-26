import Image from "next/image";
import React from "react";

export default function OrderedProduct({ item }) {
  const { img, quantity, title, price, size, color } = item;
  return (
    <div className="flex border-t border-gray-200 py-2 items-center px-2 hover:bg-gray-100 transition duration-100 ease-in">
      <span className="flex items-center space-x-2">
        <Image
          width={200}
          height={200}
          alt=""
          className="w-12 h-12 object-contain"
          src={img}
        />
        <span className="text-gray-500 w-28 text-sm">
          {title}
          <span className="text-xs ml-1 text-black">
            ({size}/{color})
          </span>
        </span>
      </span>
      <span className="ml-auto text-gray-900">{quantity}</span>
      <span className="ml-auto text-gray-900 font-medium">${price}</span>
    </div>
  );
}
