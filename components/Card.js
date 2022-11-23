import React from "react";

export default function Card() {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="border border-gray-200 p-6 rounded-md hover:shadow-lg transition ease-in duration-100 bg-white shadow-md">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
          The Catalyzer
        </h2>
        <p className="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
  );
}
