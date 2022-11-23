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

const headings = [""];

export default function Orders() {
  const basket = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <div className="md:px-20 w-[80vw] md:py-6">
      <div className="mx-auto p-5">
        <p className="md:text-[4vw] font-bold text-3xl w-full text-center">
          My Orders
        </p>
      </div>
      <table class="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
