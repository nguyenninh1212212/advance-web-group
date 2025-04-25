import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/forgotpassword";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Nhận email từ `location.state`
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !retypePassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      await resetPassword(email, "otp_placeholder", password, retypePassword); // Gọi API
      alert("Password reset successfully.");
      navigate("/auth/login"); // ✅ Chuyển hướng sau khi đặt lại mật khẩu
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    }

    setLoading(false);
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
          {/* Password input */}
          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Retype Password input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Retype Password"
              className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          
          {/* Nút Reset Password */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold ${loading ? "bg-gray-500" : "bg-primary-200 hover:bg-white hover:text-primary-200 text-white"}`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            <a href="/auth/login" className="text-primary-200 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
