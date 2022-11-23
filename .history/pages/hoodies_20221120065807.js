import React from "react";
import Product from "../components/Product";

export const getServerSideProps = async () => {
  const response = await fetch(
    `http://localhost:3000/api/getProducts?category=Hoodies`
  );
  const data = await response.json();
  return {
    props: {
      data: Object.entries(data),
    },
  };
};

export default function Hoodies({ data }) {
  console.log(data);
  return (
    <div>
      <section className="text-gray-400 bg-gray-50 body-font">
        <div className="container px-5 py-14 md:py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((product, index) => (
              <Product
                key={index}
                image={product[1].img}
                title={product[1].title}
                category={product[1].category}
                color={product[1].color}
                slug={product[1].slug}
                size={product[1].size}
                price={product[1].price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
