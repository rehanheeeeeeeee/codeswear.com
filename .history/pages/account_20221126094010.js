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
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector(selectUser);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "pinCode":
        setPinCode(value);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
        );
        const data = await response.json();
        if (value in data) {
          setState(data[value][0]);
          setCity(data[value][1]);
        } else {
          setState("");
          setCity("");
        }
        break;

      case "city":
        setCity(value);
        break;

      case "state":
        setState(value);
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
    <div className=" w-screen pt-10">
      <p className={styles.heading}>Update Your Account</p>
      <AccountDeliveryForm
        name={name}
        email={email}
        phone={phone}
        pinCode={pinCode}
        city={city}
        state={state}
        address={address}
        handleChange={handleChange}
      />
    </div>
  );
}
