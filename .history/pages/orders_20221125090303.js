import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user";

const styles = {
  headings: "flex flex-items w-full justify-between p-2 text-pink-500 text-lg",
  heading: "flex-1 ",
  heading2: "mx-16 ",
};

const Column = ({ column }) => (
  <th
    scope="col"
    class="text-sm font-medium text-center text-gray-900 px-6 py-4 "
  >
    {column}
  </th>
);

const Row = ({ order }) => (
  <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
    <td class="px-6 py-4 truncate whitespace-nowrap text-sm font-medium text-gray-900">
      {order._id}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {order.email}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      ₹{order.amount}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <Link
        href={`/order?id=${order.orderId}`}
        className="underline text-blue-400"
      >
        See Details
      </Link>
    </td>
  </tr>
);

const columns = ["#OrderId", "Email", "Amount", "Details"];

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState();
  const token = useSelector(selectUser);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });
  useEffect(() => {
    if (token) {
      const getOrders = async () => {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/myOrders?token=${token}`
        )
          .then((res) => res.json())
          .then((data) => setOrders(data.orders));
      };
      getOrders();
    }
  }, [token]);
  console.log(orders);
  return (
    <div className="lg:px-20 px-10 py-5">
      <div className="mx-auto p-4">
        <p className="md:text-[4vw] font-bold py-10 text-3xl w-full text-center">
          My Orders
        </p>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
                <thead class="bg-white border-b">
                  <tr>
                    {columns.map((column, index) => (
                      <Column key={index} column={column} />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <Row key={index} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
