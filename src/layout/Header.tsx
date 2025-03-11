import React from "react";
import { GrSearch } from "react-icons/gr";
import { LayoutRouteProps, useNavigate } from "react-router-dom";
import { icon } from "../constant";
import { Link } from "react-router-dom";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar cố định */}
      <div className="fixed w-screen bg-gray-800 border-b-4 shadow-2xl border-b-primary-200 flex justify-center z-50 ">
        <div className="w-[1200px] h-[70px] flex justify-between items-center p-3">
          <Link
            to="/"
            className="w-1/5 flex items-center text-white font-bold gap-2"
          >
            <img
              src={icon.logo}
              alt="Logo"
              className="w-16 h-16 rounded-full"
            />
            <p>Tư Bản Truyện</p>
          </Link>

          {/* Ô tìm kiếm */}
          <div className="flex border-r-2 border-l-2 justify-center px-2 w-3/5 mx-2 text-white">
            <div className="flex bg-stone-500 items-center px-2 w-4/5 gap-2">
              <input
                type="text"
                placeholder="Tìm kiếm truyện....."
                className="w-full h-8 bg-stone-500 outline-none"
              />
              <GrSearch className="text-black text-xl cursor-pointer" />
            </div>
          </div>

          {/* Nút đăng nhập/đăng ký */}
          <div className="w-1/5 flex justify-evenly gap-2">
            <button
              className="bg-cyan-400 text-white p-2 text-sm font-light rounded-md w-28"
              onClick={() => navigate("/auth/register")}
            >
              Đăng ký
            </button>
            <button
              className="bg-cyan-400 text-white p-2 text-sm font-light rounded-md w-28"
              onClick={() => navigate("/auth/login")}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính, có flex-grow để đẩy footer xuống */}
      <main className="flex-grow pt-28 w-[1200px] mx-auto h-auto">
        {children}
      </main>

      {/* Footer cố định dưới cùng */}
      <footer className="bg-gray-800 w-full border-t-2 border-t-primary-200  h-40 flex items-center justify-center mt-auto">
        <p className="text-white">© 2025 Tư Bản Truyện. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Header;
