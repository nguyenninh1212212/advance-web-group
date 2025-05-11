import React, { useState, useRef, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import { GiAngularSpider } from "react-icons/gi";
import { LiaSlidersHSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import Profile from "../components/popup/Profile";
import CardSearchResult from "../components/card/CardSearchResult";

import { setCategory } from "../redux/slices/categorySlice";
import { selectTheme } from "../redux/slices/themeSlice";
import { elasticSearch } from "../api/stories";
import { IStory } from "../type/comic";

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector(selectTheme);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Gọi API tìm kiếm khi có từ khóa
  const {
    data: searchResults,
    error: searchError,
    isLoading: isSearching,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => elasticSearch(searchTerm, 0, 10),
    enabled: !!searchTerm,
  });
  console.log("🚀 ~ searchResults:", searchResults);

  // Đóng popup tìm kiếm khi điều hướng
  useEffect(() => {
    setIsSearchFocused(false);
    setIsProfileOpen(false);
  }, [location]);

  // Đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-auto scrollbar-hide">
      {/* Header cố định */}
      <header
        className={`fixed w-screen z-50 border-b pb-1 ${theme.border_bottom} ${theme.header}`}
      >
        <div className="md:w-[1200px] w-full h-[70px] flex justify-between items-center p-3 mx-auto">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => dispatch(setCategory({ id: "Home", name: "Home" }))}
            className="flex items-center font-bold gap-2"
          >
            <GiAngularSpider className="text-5xl" />
            <span className="font-semibold font-sans md:text-3xl whitespace-nowrap">
              TruyenVerse
            </span>
          </Link>

          {/* Thanh công cụ bên phải */}
          <div className="flex items-center gap-3">
            {/* Ô tìm kiếm */}
            <section
              ref={searchContainerRef}
              className="relative hidden md:flex flex-col"
            >
              <div
                className={`flex items-center gap-2 px-2 rounded-md bg-gray-700 border-2 border-transparent hover:border-gray-600 focus-within:${theme.background_card} transition-all duration-300`}
              >
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Tìm kiếm truyện..."
                  className={`md:w-[400px] h-10 bg-gray-700 text-white px-2 placeholder-gray-400 outline-none transition-all duration-500 focus:${theme.background}`}
                />
                <GrSearch
                  className={`text-xl text-white cursor-pointer transition-transform ${
                    isSearchFocused ? "scale-125" : ""
                  }`}
                />
              </div>

              {isSearchFocused && (
                <div className="absolute top-14 w-[430px] min-h-96 bg-zinc-900 p-4 rounded-xl shadow-lg z-50">
                  {isSearching ? (
                    <p className="text-white">Đang tìm kiếm...</p>
                  ) : searchError ? (
                    <p className="text-red-500">Lỗi khi tìm kiếm!</p>
                  ) : searchResults?.result.data.length === 0 ? (
                    <p className="text-white">Không tìm thấy kết quả...</p>
                  ) : (
                    <>
                      <p className="text-white font-semibold mb-2">
                        Kết quả tìm kiếm:
                      </p>
                      {searchResults?.result.data
                        ?.slice(0, 10)
                        .map((story: IStory, index: number) => (
                          <div key={index} className="flex-1 h-32">
                            <CardSearchResult data={story} />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}
            </section>

            {/* Nút điều hướng khác */}
            <Link to="/filter">
              <LiaSlidersHSolid className="text-3xl text-white hover:text-primary-200 transition-colors" />
            </Link>

            <Link to="/my/favorite">
              <IoAlbums className="text-3xl text-white hover:text-primary-200 transition-colors" />
            </Link>

            {/* Hồ sơ người dùng */}
            <div className="relative">
              <FaUser
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="text-2xl text-white cursor-pointer hover:text-primary-200 transition-colors"
              />
              {isProfileOpen && (
                <Profile onClose={() => setIsProfileOpen(false)} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="flex-grow pt-24 px-4 md:max-w-[1200px] w-full mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer
        className={`w-full h-40 flex items-center justify-center mt-auto border-t-2 ${theme.header} ${theme.text} ${theme.border}`}
      >
        <p className="text-white">© 2025 Tư Bản Truyện. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Header;
