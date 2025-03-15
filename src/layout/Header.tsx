import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { LayoutRouteProps } from "react-router-dom";
import { icon } from "../constant";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import Profile from "../components/popup/Profile";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar cố định */}
      <header className="fixed w-screen bg-gray-800 flex justify-center z-50 border-b pb-1 border-stone-500">
        <div className="w-[1200px] h-[70px] flex justify-between items-center p-3">
          {/* Logo */}
          <Link
            to="/"
            className="w-1/5 flex items-center text-white font-bold gap-2"
          >
            <img
              src={icon.logo}
              alt="Logo"
              className="w-16 h-16 rounded-full"
            />
            <p className="font-semibold font-sans">TƯ BẢN TRUYỆN</p>
          </Link>

          {/* Ô tìm kiếm */}
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-700 rounded-md items-center px-2 gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60 h-8 bg-gray-700 text-white outline-none px-2 placeholder-gray-400"
                placeholder="Tìm kiếm truyện..."
              />
              <GrSearch className="text-xl cursor-pointer text-white" />
            </div>

            {/* Album icon */}
            <Link to={"/"}>
              <IoAlbums className="text-3xl cursor-pointer text-white" />
            </Link>

            {/* User Profile */}
            <div className="relative">
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && <Profile />}
            </div>
          </div>
        </div>
      </header>

      {/* Phần nội dung chính */}
      <main className="flex-grow pt-20 w-[1200px] mx-auto h-auto">
        {children}
      </main>

      {/* Footer cố định */}
      <footer className="bg-gray-800 w-full border-t-2 border-primary-200 h-40 flex items-center justify-center mt-auto">
        <p className="text-white">© 2025 Tư Bản Truyện. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Header;
