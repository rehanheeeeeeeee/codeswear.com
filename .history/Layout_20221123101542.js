import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { setCart } from "./redux/cart";
import { setUser } from "./redux/user";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    router.events.on("routeChangeComplete", () => setProgress(100));
    try {
      dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    } catch (error) {
      localStorage.clear();
    }
    if (localStorage.getItem("token")) {
      dispatch(setUser(localStorage.getItem("token")));
    }
  }, [dispatch, router]);
  const [progress, setProgress] = useState(0);
  return (
    <div className="relative">
      {/* A loading bar starts up top and this progress */}
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
