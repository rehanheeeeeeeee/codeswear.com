import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import OrderedProduct from "../components/OrderedProduct";
import { selectBasket, selectBasketTotal } from "../redux/cart";

const styles = {
  headings: "flex flex-items w-full justify-between p-2 text-pink-500 text-lg",
  heading: "flex-1 ",
  heading2: "mx-16 ",
};

const Headings = () => (
  <div className={styles.headings}>
    <div className={styles.heading}>Description</div>
    <div className={styles.heading2}>Quantity</div>
    <div>Price</div>
  </div>
);

export default function Orders() {
  const basket = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 space-y-3">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Codeswear
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id : #8877
            </h1>
            <Headings />
            {basket.map((item, index) => (
              <OrderedProduct key={index} item={basket[0]} />
            ))}
            <div className="flex items-center my-5">
              <span className="title-font font-semibold text-xl text-gray-900">
                Subtotal:
                <span className="text-base text-red-500 ml-4">$</span>
                <span className="font-semibold">{basketTotal}</span>
              </span>
              <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <Image
            width={1920}
            height={1080}
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
}
