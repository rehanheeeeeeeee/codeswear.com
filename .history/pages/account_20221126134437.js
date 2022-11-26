import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountDeliveryForm from "../components/AccountDeliveryForm";
import ChangePassword from "../components/ChangePassword";
import { selectUser } from "../redux/user";

const styles = {
  heading: "w-full text-center font-bold text-xl md:text-3xl",
};

export default function Account() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [userDB, setUserDB] = useState({});
  const [name, setName] = useState(userDB.username ? userDB.username : "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(userDB.phone ? userDB.phone : "");
  const [pinCode, setPinCode] = useState(userDB.pincode ? userDB.pincode : "");
  const [address, setAddress] = useState(userDB.address ? userDB.address : "");
  const [password, setPasssword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => setUserDB(data));
  }, [user]);

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
        break;

      case "address":
        setAddress(value);
        break;

      case "password":
        setPasssword(value);
        break;

      case "confirmPassword":
        setConfirmPassword(value);
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
    <div className="space-y-10 pt-10 px-2 md:p-5 flex flex-col items-center">
      <p className={styles.heading}>Update Your Account</p>
      <AccountDeliveryForm
        name={name}
        email={email}
        phone={phone}
        pinCode={pinCode}
        address={address}
        handleChange={handleChange}
      />
      <ChangePassword
        password={password}
        confirmPassword={confirmPassword}
        handleChange={handleChange}
      />
    </div>
  );
}
