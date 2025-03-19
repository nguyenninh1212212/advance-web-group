import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { LayoutRouteProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import Profile from "../components/popup/Profile";  
import { GiAngularSpider } from "react-icons/gi";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen overflow-auto scrollbar-hide">
      {/* Navbar cố định */}
      <header className="fixed w-screen bg-gray-800 flex justify-center z-50 border-b pb-1 border-primary-200 ">
        <div className="md:w-[1200px] w-full h-[70px] flex justify-between items-center p-3">
          {/* Logo */}
          <Link
            to="/"
            className="w-fit flex items-center text-white font-bold gap-2"
          >
            <GiAngularSpider className="text-5xl" />
            <p className="font-semibold font-sans md:text-3xl whitespace-nowrap">
              Manga Capital
            </p>
          </Link>

          {/* Ô tìm kiếm */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-gray-700 rounded-md items-center px-2 gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-60 md:flex h-8 bg-gray-700 text-white outline-none px-2 placeholder-gray-400"
                placeholder="Tìm kiếm truyện..."
              />
              <Link
                to={`/result?keyword=${encodeURIComponent(
                  searchTerm
                )}&page=0&limit=18  `}
              >
                <GrSearch className="text-xl cursor-pointer text-white" />
              </Link>
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
              {isOpen && <Profile onClose={() => setIsOpen(!isOpen)} />}
            </div>
          </div>
        </div>
      </header>

      {/* Phần nội dung chính */}
      <main className="flex-grow pt-24 px-4 md:max-w-[1200px] overflow-hidden w-screen mx-auto h-auto">
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
