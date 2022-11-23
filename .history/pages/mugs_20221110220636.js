import React from "react";
import Product from "../components/Product";

export default function Mugs() {
  return (
    <div>
      <section className="text-gray-400 bg-gray-50 body-font">
        <div className="container px-5 py-14 md:py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/61bHM+9qqJL._AC_SX679_.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
}
