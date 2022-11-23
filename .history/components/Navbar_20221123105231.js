import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenSideCart, setOpenSideCart } from "../redux/sidebar";
import { emptyUser, selectUser } from "../redux/user";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  container:
    "sticky top-0 z-10 bg-white w-full flex items-center md:space-x-5 flex-col md:px-8 pb-3 pt-1 md:justify-start shadow-md md:flex-row  space-y-3 justify-between",
  options: "flex items-center justify-center gap-5 font-semibold",
  hyperLink: "transition duration-100 ease-in hover:text-gray-600 capitalize",
  icon: "text-2xl ml-3 md:text-3xl font-extrabold text-pink-600 hover:text-pink-800 transition ease-in duration-100",
  header: "font-semibold text-lg w-full text-center",
  close:
    "absolute top-4 right-2 text-3xl hover:text-pink-700 cursor-pointer text-pink-600",
  button:
    "flex items-center space-x-2 mt-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 transition ease-in duration-100 rounded-3xl text-lg",
  dropDown:
    "absolute md:top-5 md:right-20 top-24 right-56 bg-pink-300 rounded-lg shadow-md p-3 space-y-2",
  userOption:
    "p-2 transition cursor-pointer ease-in duration-100 rounded-lg hover:bg-pink-400 ",
};

const hyperLinks = ["tshirts", "mugs", "stickers", "hoodies"];

const HyperLink = ({ hyperlink, router }) => (
  <div className="cursor-pointer" onClick={() => router.push(`/${hyperlink}`)}>
    <li className={styles.hyperLink}>{hyperlink}</li>
  </div>
);

export default function Navbar() {
  const openSideCart = useSelector(selectOpenSideCart);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [dropdown, setDropdown] = useState(false);
  const handleLogout = () => {
    dispatch(emptyUser());
    toast.success("Successfully Logged Out", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer
        position="top-left"
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
      <nav className={styles.container}>
        <div onClick={() => router.push("/")}>
          <Image
            width={200}
            height={45}
            alt=""
            src={"/assets/logo.webp"}
            className="relative mr-auto top-1 cursor-pointer"
          />
        </div>
        <ul className={styles.options}>
          {hyperLinks.map((hyperlink, index) => (
            <HyperLink key={index} router={router} hyperlink={hyperlink} />
          ))}
        </ul>
        {!user ? (
          <Link
            href={"/login"}
            className="md:absolute bg-pink-600 rounded-lg text-white p-2 font-base right-14 md:right-20 cursor-pointer top-0.5 md:-top-1"
          >
            LogIn
          </Link>
        ) : (
          <>
            <div
              onClick={() => setDropdown(!dropdown)}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className="md:absolute right-14 md:right-16 md:top-0.5 top-1"
            >
              <MdAccountCircle size={30} className={styles.icon} />
            </div>
            {dropdown && (
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.dropDown}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <p className={styles.userOption}>My Account</p>
                <p
                  onClick={() => router.push("/orders")}
                  className={styles.userOption}
                >
                  Orders
                </p>
                <p className={styles.userOption} onClick={handleLogout}>
                  Sign out
                </p>
              </motion.div>
            )}
          </>
        )}
        <div
          onClick={() => dispatch(setOpenSideCart())}
          className="absolute right-4 cursor-pointer top-1 md:top-0.5"
        >
          <AiOutlineShoppingCart size={30} className={styles.icon} />
        </div>
      </nav>

      <Sidebar openSideCart={openSideCart} setOpenSideCart={setOpenSideCart} />
    </>
  );
}
