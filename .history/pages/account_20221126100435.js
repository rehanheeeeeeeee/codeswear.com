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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector(selectUser);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "pinCode":
        setPinCode(value);
        break;

      case "address":
        setAddress(value);
        break;

      default:
        break;
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
        username={username}
        email={email}
        phone={phone}
        pinCode={pinCode}
        address={address}
        handleChange={handleChange}
      />
    </div>
  );
}
