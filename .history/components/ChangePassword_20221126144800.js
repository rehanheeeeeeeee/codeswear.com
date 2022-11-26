import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user";
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
      toggle
      required
    />
  </div>
);

export default function ChangePassword({
  newPassword,
  confirmPassword,
  handleChange,
}) {
  const user = useSelector(selectUser);
  const inputs = [
    { name: "newPassword", type: "password", value: newPassword },
    { name: "confirmPassword", type: "password", value: confirmPassword },
  ];

  const handleChangePassword = (e) => {
    e.preventDefault();
    const data = { token: user.token, password, confirmPassword };
    if (password === confirmPassword) {
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.success, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error("Passwords Do not Match", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
      <p className="font-semibold">2. Change Password</p>
      <form onSubmit={handleChangePassword}>
        <div className="w-full flex md:grid md:grid-cols-2 max-md:flex-col md:gap-5">
          {inputs.map((input, index) => (
            <Input key={index} input={input} handleChange={handleChange} />
          ))}
        </div>
        <div className="w-full">
          <button type="submit" className={styles.button}>
            <p>Confirm</p>
          </button>
        </div>
      </form>
    </div>
  );
}
