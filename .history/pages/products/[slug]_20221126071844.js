import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart, clearCart } from "../../redux/cart";
import { setOpenSideCart } from "../../redux/sidebar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../modals/Product";
import mongoose from "mongoose";

const styles = {
  pincode: "mt-6 space-x-3 text-sm flex items-center w-full",
  pincodeInput: "outline-none border border-pink-400 p-2 rounded-md",
  service: (servicable) =>
    `${servicable ? "text-green-500" : "text-red-500"} text-sm mt-2`,
};

export const getServerSideProps = async (context) => {
  const { title, color, slug } = context.query;
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_ID);
  }
  let types = {};
  let item = await Product.findOne({ slug: slug });
  let items = await Product.find({ title: title, color: color });
  items.forEach((item) => {
    if (item.color in types) {
      types[item.color][item.size] = {
        slug: item.slug,
        availableQty: item.availableQty,
      };
    } else {
      types[item.color] = {};
      types[item.color][item.size] = {
        slug: item.slug,
        availableQty: item.availableQty,
      };
    }
  });

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
      types,
      items: JSON.parse(JSON.stringify(items)),
    },
  };
};

export default function ProductPage({ item, types, items }) {
  const { title, img, category, desc, price, slug, _id } = item;
  const router = useRouter();
  const [pin, setPin] = useState("");
  const colors = router.query.colors.split(",");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    types[selectedColor] ? Object.keys(types[selectedColor])[0] : ""
  );
  const [selectedSlug, setSelectedSlug] = useState(
    types[selectedColor] ? types[selectedColor][selectedSize]?.slug : ""
  );
  const [outOfStock, setOutofStock] = useState(
    types[selectedColor] &&
      types[selectedColor][selectedSize] &&
      types[selectedColor][selectedSize].availableQty > 0
      ? false
      : true
  );
  const [service, setService] = useState();
  const dispatch = useDispatch();

  const checkPin = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      .then((res) => res.json())
      .then((data) => {
        if (pin in data) {
          setService(true);
          toast.success("Your pin Code is Servicable", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setService(false);
          toast.error("Sorry your pincode is not Servicable", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  const buyNow = () => {
    dispatch(clearCart());
    dispatch(
      addToCart({
        title: title,
        slug: selectedSlug,
        id: _id,
        img: img,
        price: price,
        size: selectedSize,
        color: selectedColor,
        category: category,
      })
    );
    router.push("/checkout");
  };

  const handleSelectColor = (color) => {
    router.push(
      `/products/${slug}?color=${color}&title=${title}&colors=${colors}`,
      undefined,
      { scroll: false }
    );
    setSelectedColor(color);
  };
  useEffect(() => {
    setSelectedSize(
      types[selectedColor] ? Object.keys(types[selectedColor])[0] : ""
    );
  }, [types, selectedColor]);

  useEffect(() => {
    setSelectedSlug(
      selectedSize ? types[selectedColor][selectedSize]?.slug : ""
    );
  }, [selectedSize]);
  useEffect(() => {
    setOutofStock(
      types[selectedColor][selectedSize].availableQty > 0 ? false : true
    );
  }, [selectedSize]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-96 h-64 object-contain bg-white rounded"
            src={img}
            width={1920}
            height={256}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CodesWear
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {title} ({selectedSize} / {selectedColor})
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[0, 1, 2, 3].map((num, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500"></a>
              </span>
            </div>
            <p className="leading-relaxed">{desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center">
                <span className="mr-3">Color</span>
                {colors.map((color, index) => (
                  <button
                    onClick={() => handleSelectColor(color)}
                    key={index}
                    className={`mr-1 my-2 rounded-full transtion-all duration-200 ease-in${
                      color === "black" && "bg-black"
                    } ${color === "blue" && "bg-blue-500"} ${
                      color === "red" && "bg-red-500"
                    } ${color === "pink" && "bg-pink-500"} ${
                      color === "purple" && "bg-purple-500"
                    } ${color === "black" && "bg-black"}
                    ${color === "orange" && "bg-orange-500"} 
                    ${color === "green" && "bg-green-500"}  ${
                      color === "yellow" && "bg-yellow-500"
                    } border-2 ${
                      color === selectedColor
                        ? "border-gray-800"
                        : "border-gray-300"
                    } w-6 h-6`}
                  ></button>
                ))}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                  >
                    {types[selectedColor] &&
                      Object.keys(types[selectedColor]).map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{price}
              </span>
              <div className="flex items-center flex-1 space-x-5 justify-end">
                <button
                  onClick={buyNow}
                  className="flex items-center whitespace-nowrap text-white text-xs md:text-md font-semibold md:text-md bg-pink-500 border-0 py-3 md:py-3 px-4 md:px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    dispatch(setOpenSideCart());
                    dispatch(
                      addToCart({
                        id: _id,
                        title: title,
                        slug: selectedSlug,
                        img: img,
                        price: price,
                        size: selectedSize,
                        color: selectedColor,
                        category: category,
                      })
                    );
                  }}
                  className="flex items-center whitespace-nowrap text-white text-xs md:text-md font-semibold  bg-pink-500 border-0 py-3 md:py-3 px-3 md:px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-8 font-md before:content before:h-0.5 before:bottom-0 relative before:absolute before:w-96 before:bg-pink-500">
              Check to see if we deliver to your location
            </p>
            <div className={styles.pincode}>
              <input
                type={"text"}
                placeholder="Type Pincode...."
                className={styles.pincodeInput}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <button
                onClick={checkPin}
                className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Check
              </button>
            </div>
            {service && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.service(true)}
              >
                Yay this pincode is servicable
              </motion.p>
            )}
            {!service && service !== undefined && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.service(false)}
              >
                Sorry we do not deliver to this pincode
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
