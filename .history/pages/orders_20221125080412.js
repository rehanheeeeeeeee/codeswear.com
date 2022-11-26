import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders`,{
        body:{
          token:localStorage.getItem('token')
        }
      })
      const data = await response.json();
      setOrders(data);
    };
    getOrders();
  }, []);
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
                    <th
                      scope="col"
                      class="text-sm font-medium text-center text-gray-900 px-6 py-4 "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4  text-center"
                    >
                      First
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Last
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      1
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
