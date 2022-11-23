import Image from "next/image";
import React from "react";

export default function OrderedProduct({ item }) {
  const { image, quantity, name, price, size, variant } = item;
  return (
    <div className="flex border-t border-gray-200 py-2 items-center px-2">
      <tbody>
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            1
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            Mark
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            Otto
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            @mdo
          </td>
        </tr>
      </tbody>
    </div>
  );
}
