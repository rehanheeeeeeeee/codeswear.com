import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user";

export default function MyAccount() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      console.log("user exists");
    } else {
      console.log(user, "User doesnt exists");
      router.push("/");
    }
  });

  return <div>myaccount</div>;
}
