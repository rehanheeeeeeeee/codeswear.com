import Image from "next/image";
import React from "react";
import Product from "../components/Product";

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/getProducts");
  const data = await response.json();
  return {
    props: {
      data: data,
    },
  };
};

export default function Tshirts() {
  return (
    <div>
      <section className="text-gray-400 bg-gray-50 body-font">
        <div className="container px-5 py-14 md:py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
            <Product image="https://m.media-amazon.com/images/I/71+e98z22xL._AC_UY741_.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
}
