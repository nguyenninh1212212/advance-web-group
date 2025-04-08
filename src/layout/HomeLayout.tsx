import React, { useState, useEffect } from "react";
import CardCategory from "../components/card/CardCategory";
import Header from "./Header";
import { category } from "../util/category";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Popup from "../components/popup/Popup";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  // Theo dõi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categoriesToShow = isMobile ? category.slice(0, 7) : category;

  return (
    <Header>
      <div className="pb-4 flex flex-wrap gap-2 w-full h-auto">
        {[
          { name: "Home", value: "Home" },
          { name: "All", value: "All" },
        ].map((e, index) => (
          <CardCategory key={index} name={e.name} />
        ))}
        {categoriesToShow.map((e, index) => (
          <CardCategory key={index} name={e.name} />
        ))}

        {isMobile && category.length > 7 && (
          <button
            className="bg-gray-600 text-gray-300 py-1 px-3 rounded-2xl inline-block"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdOutlineMoreHoriz />
          </button>
        )}
      </div>

      {children}

      {/* Popup chỉ xuất hiện khi đang ở mobile và isOpen true */}
      {isMobile && isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          backgroundColor="bg-gray-800"
        >
          <div className="gap-2 flex flex-wrap w-full h-auto">
            {category.map((e, index) => (
              <CardCategory key={index} name={e.name} />
            ))}
          </div>
        </Popup>
      )}
    </Header>
  );
};

export default HomeLayout;
