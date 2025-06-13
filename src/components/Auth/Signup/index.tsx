"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
   const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/registerUser`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      Cookies.remove('isLoggedIn');
  dispatch(logout());
      router.push("/signin");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      {/* <Breadcrumb title={"Signup"} pages={["Signup"]} /> */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/signin-bg.jpg')",
        }}
      >
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 mt-10 mb-10">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

          <div className="m-auto relative z-10 w-full max-w-md p-6 bg-white/20 backdrop-blur-md rounded-lg mt-25">
            <div className="text-center mb-5">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-white mb-1.5">
                Create an Account
              </h2>
            </div>

            <div className="mt-5.5">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2.5 text-white">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5 text-white">
                    Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5 text-white">
                    Password <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  Create Account
                </button>

                <p className="text-center mt-6 text-gray">
                  Already have an account?
                  <Link
                    href="/signin"
                    className="text-white ease-out duration-200 hover:text-blue pl-2"
                  >
                    Sign in Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
