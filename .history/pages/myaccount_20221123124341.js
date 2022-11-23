import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user";

export default function MyAccount() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  return <div>myaccount</div>;
}
