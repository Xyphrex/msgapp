"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { sign } from "crypto";

const Page = () => {

  const [signupData, setsignupData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setsignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = CryptoJS.SHA256(signupData.password).toString();
    const temp = structuredClone(signupData);
    temp.password = password;
    try {
      const response = await fetch("api/signup", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(temp)});
      const result = await response.json();

      if (response.ok) {
        // TODO: handle response when server returns fine (auth response: YES (login)/NO (login))
        if (result) {
          // Handle Login Pass
        }
        else {
          // Handle Login Fail
        }
      }
      else {
        console.error("Login Failed: ", response.status);
      }
    }
    catch (error) {
      console.error("An error occured when logging in: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
      <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(255,255,255,0.1)]">
        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-white/5 rounded-xl blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-semibold mb-6 text-center tracking-wide">
            Sign Up
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-gradient-to-r from-white/10 to-white/30 py-2 text-white font-medium tracking-wider border border-white/20 hover:from-white/20 hover:to-white/40 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;