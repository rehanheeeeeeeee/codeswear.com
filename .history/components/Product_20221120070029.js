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
      href={`/products/${slug}`}
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
        <p className="mt-1">{size.join(", ")}</p>
      </div>
    </Link>
  );
}
