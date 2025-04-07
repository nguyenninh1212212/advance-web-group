import React, { useState, useRef, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import { LayoutRouteProps, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import Profile from "../components/popup/Profile";
import { GiAngularSpider } from "react-icons/gi";
import { fakedatadetail } from "../FakeData/FakedataDetail";
import CardSearchResult from "../components/card/CardSearchResult";
import { LiaSlidersHSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/categorySlice";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  // Đóng lại khi điều hướng trang khác
  useEffect(() => {
    setIsFocused(false);
    setIsOpen(false);
  }, [location]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-auto scrollbar-hide">
      {/* Navbar cố định */}
      <header className="fixed w-screen bg-gray-800 flex justify-center z-50 border-b pb-1 border-primary-200 ">
        <div className="md:w-[1200px] w-full h-[70px] flex justify-between items-center p-3">
          {/* Logo */}
          <Link
            to="/"
            className="w-fit flex items-center text-white font-bold gap-2"
            onClick={() => dispatch(setCategory("Home"))}
          >
            <GiAngularSpider className="text-5xl" />
            <p className="font-semibold font-sans md:text-3xl whitespace-nowrap">
              TUBANTRUYEN
            </p>
          </Link>

          {/* Ô tìm kiếm */}
          <div className="flex items-center gap-3 ">
            <section className="flex flex-col" ref={searchContainerRef}>
              <div className="hidden md:flex bg-gray-700 rounded-md items-center px-2 gap-2 overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-gray-600 focus-within:border-primary-200 w-[400px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className="md:w-[400px] h-10 bg-gray-700 text-white outline-none px-2 placeholder-gray-400 transition-all duration-500 ease-in-out focus:bg-gray-600"
                  placeholder="Tìm kiếm truyện..."
                />

                <GrSearch
                  className={`text-xl cursor-pointer text-white transition-all duration-300 ${
                    isFocused ? "scale-125" : ""
                  }`}
                />
              </div>
              {isFocused && (
                <div className="absolute mt-16 w-[430px] min-h-96 bg-zinc-900 p-4 rounded-xl shadow-lg">
                  {fakedatadetail.length === 0 ? (
                    <p className="text-center flex justify-between">
                      <p> Không tìm thấy...</p>
                    </p>
                  ) : (
                    <>
                      <p className="flex justify-between">
                        Kết quả tìm kiếm...
                      </p>
                      {fakedatadetail.slice(0, 4).map((e, _i) => (
                        <div className="flex-1 h-32" key={_i}>
                          <CardSearchResult data={e} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </section>

            {/* Album icon */}
            <Link to={"/filter"}>
              <LiaSlidersHSolid className="text-3xl cursor-pointer text-white hover:text-primary-200 transition-colors duration-300" />
            </Link>
            <Link to={"/my/favorite"}>
              <IoAlbums className="text-3xl cursor-pointer text-white hover:text-primary-200 transition-colors duration-300" />
            </Link>

            {/* User Profile */}
            <div className="relative">
              <FaUser
                className="text-2xl cursor-pointer hover:text-primary-200 transition-colors duration-300"
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
