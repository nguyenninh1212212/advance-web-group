import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { icon } from "../../constant";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex  flex-col justify-center items-center h-screen bg-gray-900">
      <div className="relative  -top-10 text-white flex items-center gap-2">
        <img
          src={icon.logo}
          alt="MangaDex Logo"
          className="mx-auto w-20 rounded-full"
        />
        <p className="text-2xl font-bold">Tư bản truyện</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96  border-t-2 border-primary-200">
        {/* Logo */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Sign in to your account
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username or email"
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between text-gray-400 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-primary-200" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-primary-200 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-primary-200 hover:bg-white hover:text-primary-200 text-white py-2 rounded-md font-semibold">
            Sign In
          </button>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm">
            New user?{" "}
            <a
              href="/auth/register"
              className="text-primary-200 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
