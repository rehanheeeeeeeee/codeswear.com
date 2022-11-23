import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasket } from "../redux/cart";
import { selectUser } from "../redux/user";

export default function Account() {
  const user = useSelector(selectUser);
  const router = useRouter();
  return <div>Account</div>;
}
