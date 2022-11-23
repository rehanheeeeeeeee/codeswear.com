import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBasket } from "../redux/cart";
import { selectUser } from "../redux/user";

export default function Account() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {}, []);
  return <div>Account</div>;
}
