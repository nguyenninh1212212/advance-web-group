import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiAngularSpider } from "react-icons/gi";
import { register } from "../../api/login";

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    dateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await register({
        password: formData.password,
        retypePassword: formData.confirmPassword,
        email: formData.email,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
      });

      if (response.code === 1000) {
        navigate("/auth/success", { state: { encryptedData: response.result } });
      } else {
        alert(response.result || "Đăng ký thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 ">
      <div
        className="relative  -top-10 text-white flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <GiAngularSpider className="text-5xl" />

        <p className="text-2xl font-bold">Tư bản truyện</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 border-t-2 border-t-primary-200">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          
          
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Ngày sinh"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            required
          />
          <div className="flex justify-center mb-3">
            <input type="checkbox" required />
            <span className="text-white ml-2">I'm not a robot</span>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-200 p-2 rounded text-white font-bold"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          <a href="/auth/login" className="text-primary-200">
            &laquo; Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
