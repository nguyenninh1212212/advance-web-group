import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyRegister } from "../../api/login";

const VerifyRegister = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy encryptedData từ state truyền sang khi đăng ký thành công
  const encryptedData = location.state?.encryptedData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      alert("Vui lòng nhập OTP!");
      return;
    }
    setLoading(true);
    try {
      console.log("encryptedData", encryptedData);
      console.log("otp", otp);
      const response = await verifyRegister({ otp, encryptedData });
      if (response.code === 1000) {
        alert("Xác thực thành công!");
        navigate("/auth/login");
      } else {
        alert("OTP không đúng hoặc đã hết hạn!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 border-t-2 border-t-primary-200">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Xác thực OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary-200 p-2 rounded text-white font-bold"
            disabled={loading}
          >
            {loading ? "Đang xác nhận..." : "Xác nhận"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyRegister;