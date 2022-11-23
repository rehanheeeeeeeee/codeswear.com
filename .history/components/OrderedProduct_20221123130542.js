import Image from "next/image";
import React from "react";

export default function OrderedProduct({ item }) {
  const { image, quantity, name, price, size, variant } = item;
  return (
    <div className="flex border-t border-gray-200 py-2 items-center px-2">
      <span className="flex items-center">
        <Image
          width={200}
          height={200}
          alt=""
          className="w-12 h-12 object-contain"
          src={image}
        />
        <span className="text-gray-500">
          {name}
          <span className="text-xs ml-1 text-black">
            ({size}/{variant})
          </span>
        </span>
      </span>
      <span className="ml-auto text-gray-900">{quantity}</span>
      <span className="ml-auto text-gray-900 font-medium">${price}</span>
    </div>
  );
}
