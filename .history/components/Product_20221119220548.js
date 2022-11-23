import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Product({
  image,
  title,
  category,
  color,
  slug,
  size,
  price,
}) {
  return (
    <Link
      href={`/products/${"wear-the-code"}`}
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
          T-Shirt
        </h3>
        <h2 className="text-black title-font text-lg font-medium">
          Wear The Code
        </h2>
        <p className="mt-1">$16.00</p>
        <p className="mt-1">S, Md, X, XL, Xll</p>
      </div>
    </Link>
  );
}
