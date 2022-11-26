import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Account() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);
  return (
    <div className=" w-screen pt-12">
      <p>Update Your Account</p>
    </div>
  );
}
