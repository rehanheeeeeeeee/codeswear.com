import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  form: "w-full space-y-5",
  input:
    "w-full flex bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  label: "leading-7 capitalize text-sm text-gray-600",
  button: `flex items-center space-x-2 mt-5 text-white border-0 py-2 px-4 focus:outline-none 
  disabled:bg-pink-200 bg-pink-500 hover:bg-pink-600
   transition ease-in duration-100 rounded-3xl text-lg`,
};

const Input = ({ input, handleChange }) => (
  <div className="relative mb-4 w-full">
    <label htmlFor="email" className={styles.label}>
      {input.name}
    </label>
    <input
      value={input.value}
      onChange={handleChange}
      type={input.type}
      id={input.name}
      name={input.name}
      placeholder={input.placeholder}
      className={styles.input}
      readOnly={input.readOnly}
      required
    />
  </div>
);
export default function AccountDeliveryForm({
  name,
  email,
  phone,
  pinCode,
  address,
  handleChange,
}) {
  const user = useSelector(selectUser);

  const inputs = [
    { name: "name", type: "text", value: name },
    {
      name: "email",
      type: "email",
      value: user ? user?.email : email,
      readOnly: user,
      placeholder: "@gmail.com",
    },
    {
      name: "phone",
      type: "number",
      value: phone,
      placeholder: "Your 8 Digit Phone Number",
    },
    { name: "pinCode", type: "text", value: pinCode },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      body: JSON.stringify({
        token: user.token,
        pinCode,
        address,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(
            "Your Delivery Details Have Successfully Been Updated",
            {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      });
  };

  return (
    <div className={styles.form}>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className="font-semibold">1. Delivery Details</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="w-full flex md:grid md:grid-cols-2 max-md:flex-col md:gap-5">
          {inputs.map((input, index) => (
            <Input key={index} input={input} handleChange={handleChange} />
          ))}
        </div>
        <div className="my-2">
          <label for="address" className={styles.label}>
            Address
            <textarea
              name="address"
              value={address}
              onChange={handleChange}
              id="address"
              className={styles.input}
              rows="5"
            />
          </label>
        </div>
        <div className="w-full">
          <button type="submit" className={styles.button}>
            <p>Submit</p>
          </button>
        </div>
      </form>
    </div>
  );
}
