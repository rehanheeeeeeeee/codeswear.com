import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({
  image,
  title,
  category,
  colors,
  slug,
  size,
  price,
  desc,
}) {
  return (
    <Link
      href={`/products/${slug}?size=${size[0]}&title=${title}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
    >
      <a className="block relative rounded bg-white shadow-sm overflow-hidden">
        <Image
          width={1980}
          height={1080}
          alt="ecommerce"
          className="h-64 object-contain"
          src={image}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-black title-font text-lg font-medium">{title}</h2>
        <p className="mt-1">${price}</p>
        <div className="flex items-center">
          {size.map((size, index) => (
            <p key={index} className="mr-1 w-fit px-1 border border-gray-600">
              {size}
            </p>
          ))}
        </div>
        <div className="flex items-center">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`mr-1 my-2 rounded-full ${
                color === "black" && "bg-black"
              } ${color === "blue" && "bg-blue-500"} ${
                color === "red" && "bg-red-500"
              } ${color === "pink" && "bg-pink-500"} ${
                color === "black" && "bg-black"
              } ${color === "green" && "bg-green-500"}  ${
                color === "yellow" && "bg-yellow-500"
              } ${color === "purple" && "bg-purple-500"} 
              ${color === "orange" && "bg-orange-500"} 
              ${color === "yellow" && "bg-yellow-500"} 
               border border-gray-900 w-6 h-6`}
            ></button>
          ))}
        </div>
      </div>
    </Link>
  );
}
