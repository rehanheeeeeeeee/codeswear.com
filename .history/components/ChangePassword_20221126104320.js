import React from "react";

const styles = {
  form: "w-full space-y-5",
  input:
    "w-full flex bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  label: "leading-7 capitalize text-sm text-gray-600",
};
export default function ChangePassword({
  password,
  confirmPassword,
  handleChange,
}) {
  return (
    <div className={styles.form}>
      <p className="font-semibold">2. Change Password</p>
    </div>
  );
}
