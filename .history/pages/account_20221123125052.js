import React from "react";
import { useSelector } from "react-redux";
import { selectBasket } from "../redux/cart";

export default function Account() {
  const user = useSelector(selectUser);
  return <div>Account</div>;
}
