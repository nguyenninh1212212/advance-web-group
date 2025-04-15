import React, { useState } from "react";
import { GiAngularSpider } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/login";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const validateInputs = () => {
    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    try {
      const data = await login({ email, password });
      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("role", JSON.stringify(data.result.role));
      await login({ email, password });
      queryClient.invalidateQueries({ queryKey: ["list"] });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginWithGoogle = () => {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div
        className="relative -top-10 text-white flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <GiAngularSpider className="text-5xl" />
        <p className="text-2xl font-bold">TruyenVerse</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border-t-2 border-primary-200">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder={email ? "" : "Email"}
              className={`w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none peer ${
                errors.email ? "border-red-500" : "border-gray-700"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Email")}
            />
            <label
              className={`absolute left-3 top-2 text-gray-400 text-sm transition-all opacity-0 peer-focus:opacity-100 peer-focus:top-[-10px] peer-focus:text-primary-200`}
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder={password ? "" : "Password"}
              className={`w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none peer ${
                errors.password ? "border-red-500" : "border-gray-700"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Password")}
            />
            <label
              className={`absolute left-3 top-2 text-gray-400 text-sm transition-all opacity-0 peer-focus:opacity-100 peer-focus:top-[-10px] peer-focus:text-primary-200`}
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-primary-200 hover:bg-white hover:text-primary-200 text-white py-2 rounded-md font-semibold"
          >
            Sign In
          </button>
          <button
            onClick={handleLoginWithGoogle}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
          </button>
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
