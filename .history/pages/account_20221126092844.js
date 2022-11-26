import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Account() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  const styles = {
    heading: "w-full text-center font-bold text-xl md:text-3xl",
  };

  return (
    <div className=" w-screen pt-10">
      <p className={styles.heading}>Update Your Account</p>
    </div>
  );
}
