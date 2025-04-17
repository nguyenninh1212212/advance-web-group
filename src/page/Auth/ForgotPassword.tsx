import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    setError("");
    // Simulate sending OTP
    console.log("Forgot password request sent for:", email);
    alert("Password reset OTP sent to your email.");
    setShowOtpPopup(true);
  };

  const handleValidateOtp = () => {
    if (otp === "123456") {
      navigate("/auth/reset-password");
    } else {
      setOtpError("Invalid OTP. Please try again.");
      setShowOtpPopup(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border-t-2 border-primary-200">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Forgot Your Password?
          </h2>
          <p className="text-gray-400 text-sm">
            Enter your email to reset your password.
          </p>
        </div>
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Email"
              className={`w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none peer ${
                error ? "border-red-500" : "border-gray-700"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            onClick={handleForgotPassword}
            className="w-full bg-primary-200 hover:bg-white hover:text-primary-200 text-white py-2 rounded-md font-semibold"
          >
            Reset Password
          </button>
          <p className="text-center text-gray-400 text-sm">
            <a
              href="/auth/login"
              className="text-primary-200 hover:underline"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              Enter OTP
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                }}
              />
              {otpError && <p className="text-red-500 text-xs">{otpError}</p>}
              <button
                onClick={handleValidateOtp}
                className="w-full bg-primary-200 hover:bg-white hover:text-primary-200 text-white py-2 rounded-md font-semibold"
              >
                Validate OTP
              </button>
              <p className="text-center text-gray-400 text-sm">
                <a
                  href="#"
                  onClick={() => alert("OTP resent to your email.")}
                  className="text-primary-200 hover:underline"
                >
                  Resend OTP
                </a>
              </p>
              <p className="text-center text-gray-400 text-sm">
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
      )}
    </div>
  );
};

export default ForgotPassword;