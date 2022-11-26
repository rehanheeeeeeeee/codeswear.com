import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
      {input.label}
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

export default function Forgotpassword() {
  const router = useRouter();
  const token = router.query.token;
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputs = [
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      value: newPassword,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: confirmPassword,
    },
  ];

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "newPassword":
        setNewPassword(value);
        break;

      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  });

  const sendResetEmail = () => {
    const data = {
      email,
    };
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleChangePassword = () => {};

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image
            width={1920}
            height={1080}
            className="mx-auto h-16 w-auto"
            src={"/assets/circleLogo.png"}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forget Password
          </h2>
          <Link
            href={"/signup"}
            className="w-full text-center hover:text-pink-400 duration-150 transition ease-in text-pink-500"
          >
            <p className="my-2"> Or Signup</p>
          </Link>
        </div>
        {token ? (
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
        ) : (
          <form className="mt-8 space-y-6" onSubmit={sendResetEmail}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Create New Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
