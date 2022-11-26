import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Forgotpassword() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  });
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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
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
      </div>
    </div>
  );
}
