import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { setCart } from "./redux/cart";
import { setUser } from "./redux/user";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    // Setting progress to 100 when we have completed the navigation
    // so that loadingbar becomes completed when page loaded

    // This will make our loading bar go directly to 100 percent.
    router.events.on("routeChangeComplete", () => setProgress(100));

    // First loading bar is going to go to 40 then 100 this makes the
    // loading bar be smooth
    router.events.on("routeChangeStart", () => setProgress(40));

    try {
      dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    } catch (error) {
      localStorage.clear();
    }
    if (localStorage.getItem("user")) {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch, router]);
  const [progress, setProgress] = useState(0);
  return (
    <div className="relative">
      {/* A loading bar starts up top and this progress */}
      <LoadingBar
        color="#ff2d55"
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
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
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
}
