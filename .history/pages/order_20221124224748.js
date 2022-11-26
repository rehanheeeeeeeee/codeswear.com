import mongoose from "mongoose";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderedProduct from "../components/OrderedProduct";
import Order from "../modals/Order";
import Product from "../modals/Product";
import { clearCart, selectBasket, selectBasketTotal } from "../redux/cart";

const styles = {
  headings: "flex flex-items w-full justify-between p-2 text-pink-500 text-lg",
};

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_ID);
  }
  const order = await Order.findOne({}, {}, { sort: { created_at: -1 } });
  let products = [];
  for (let i = 0; i < order.products.length; i++) {
    const product = order.products[i];
    const item = await Product.findOne({ _id: product.productId });
    products.push({
      price: item.price,
      img: item.img,
      title: item.title,
      color: product.color,
      size: product.size,
      quantity: product.quantity,
    });
  }
  order.products = products;
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

const Headings = () => (
  <div className={styles.headings}>
    <div>Description</div>
    <div className="pl-14">Quantity</div>
    <div>Price</div>
  </div>
);

export default function LatestOrder({ order }) {
  const { amount, email, products, address } = order;
  const basket = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    if (router.query.session === "succeeded") {
      dispatch(clearCart());
    }
  }, [dispatch, router]);
  return (
    <section className="text-gray-600 body-font bg-slate-50 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 space-y-3">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Codeswear
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id : #8877
            </h1>
            <Headings />
            {products.map((item, index) => (
              <OrderedProduct key={index} item={item} />
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
            className="lg:w-1/2 w-full bg-white lg:h-96 h-64 rounded-md object-contain object-center p-5"
            src={products[1].img}
          />
        </div>
      </div>
    </section>
  );
}
