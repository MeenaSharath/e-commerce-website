'use client';

import Breadcrumb from "@/components/Common/Breadcrumb";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/authSlice";
import Cookies from 'js-cookie'; // ✅ Added import

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");

  try {
    let response;
  try {
    response = await axios.post('https://e-commerce-project-dashboard.onrender.com/loginUser', {
      email,
      password,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("After axios.post");
  } catch (axiosError) {
    console.error("Axios error inside try:", axiosError);
    throw axiosError; // re-throw to your outer catch
  }
    if (response.data.message === 'Success') {
      dispatch(login());
      Cookies.set('isLoggedIn', 'true');
      window.location.href = "/";
    } else {
      alert(response.data.message || 'Login failed.');
    }

  } catch (error: any) {
    console.error('Login failed:', error.message);
    if (error.response && error.response.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('An error occurred during login.');
    }
  }
};

  return (
    <>
      {/* <Breadcrumb title={"Signin"} pages={["Signin"]} /> */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/signin-bg.jpg')" }}
      >
        <div className="max-w-[1170px] w-full mx-auto">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0 " />
          <div className="m-auto relative z-10 w-full max-w-md p-6 bg-white/20 backdrop-blur-md rounded-lg mt-28">
            <div className="text-center mb-5">
              <h2 className="font-bold text-xl sm:text-2xl xl:text-heading-5 text-white ">
                Sign In to Your Account
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5 text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="on"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
              >
                Sign in to account
              </button>

              <a
                href="#"
                className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
              >
                Forget your password?
              </a>

              <span className="relative z-1 block font-medium text-center mt-4.5">
                <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                <span className="inline-block px-3 bg-white">Or</span>
              </span>

              <p className="text-center text-dark-4 mt-6">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-dark ease-out duration-200 text-white hover:text-blue pl-2"
                >
                  Sign Up Now!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
