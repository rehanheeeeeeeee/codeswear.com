import React from "react";

const styles = {
  form: "w-full space-y-5",
  input:
    "w-full flex bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  label: "leading-7 capitalize text-sm text-gray-600",
};

const Input = ({ input }) => (
  <div className="relative mb-4 w-full">
    <label htmlFor="email" className={styles.label}>
      {input.name}
    </label>
    <input
      type={input.type}
      id={input.name}
      name={input.name}
      className={styles.input}
    />
  </div>
);

export default function CheckoutForm({
  name,
  setName,
  email,
  setEmail,
  setPhone,
  phone,
  pinCode,
  setPinCode,
  setCity,
  city,
  setState,
  state,
  address,
  setAddress,
}) {
  const inputs = [
    { name: "name", type: "text", value: name, handleChange: setName },
    { name: "email", type: "email", value: email, handleChange: setEmail },
    { name: "phone", type: "phone", value: phone, handleChange: setPhone },
    { name: "city", type: "text", value: city, handleChange: setCity },
    { name: "state", type: "text", value: state, handleChange: setState },
    { name: "PinCode", type: "text", value: pinCode, handleChange: setPinCode },
  ];
  return (
    <div className={styles.form}>
      <p className="font-semibold">1. Delivery Details</p>
      <div className="w-full flex md:grid md:grid-cols-2 max-md:flex-col md:gap-5">
        {inputs.map((input, index) => (
          <Input key={index} input={input} />
        ))}
      </div>
      <div className="my-2">
        <label for="address" className={styles.label}>
          Address
          <textarea id="address" className={styles.input} rows="5" />
        </label>
      </div>
    </div>
  );
}
