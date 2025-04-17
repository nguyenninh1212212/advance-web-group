import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!password || !retypePassword) {
      setError("Both fields are required.");
      return;
    }
    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Add logic to reset the password (e.g., API call)
    console.log("Password reset successfully.");
    alert("Password reset successfully.");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border-t-2 border-primary-200">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Reset Your Password
          </h2>
        </div>
        <div className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Retype Password"
              className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            onClick={handleResetPassword}
            className="w-full bg-primary-200 hover:bg-white hover:text-primary-200 text-white py-2 rounded-md font-semibold"
          >
            Reset Password
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            <a
              href="/auth/login"
              className="text-primary-200 hover:underline"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;