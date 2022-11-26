import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountDeliveryForm from "../components/AccountDeliveryForm";
import { selectUser } from "../redux/user";

const styles = {
  heading: "w-full text-center font-bold text-xl md:text-3xl",
};

export default function Account() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector(selectUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div className=" w-screen pt-10 p-3 md:p-5 space-y-7">
      <p className={styles.heading}>Update Your Account</p>
      <AccountDeliveryForm
        name={name}
        email={email}
        handleChange={handleChange}
      />
    </div>
  );
}
