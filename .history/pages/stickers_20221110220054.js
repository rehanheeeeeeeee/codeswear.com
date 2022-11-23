import React from "react";
import Product from "../components/Product";

export default function stickers() {
  return (
    <div>
      <section className="text-gray-400 bg-gray-50 body-font">
        <div className="container px-5 py-14 md:py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/81wq3kiqw6L._AC_UL480_FMwebp_QL65_.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
}
