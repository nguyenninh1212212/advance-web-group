import React, { useState } from "react";
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
  const categories01 = category.slice(0, 7);
  return (
    <Header>
      <div className="pb-4 flex flex-wrap gap-2 w-full  h-auto">
        {categories01.map((e, index) => (
          <CardCategory key={index} name={e.name} />
        ))}
        {category.length > 6 && (
          <button
            className={`bg-gray-600 text-gray-300 py-1 px-3 rounded-2xl inline-block `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdOutlineMoreHoriz />
          </button>
        )}
      </div>

      {children}
      {isOpen == true && (
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
