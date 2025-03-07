import React from "react";
import { categoriesWithColors } from "../../util/category";

interface payload {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (name: string) => void;
  value: string[];
}

const Menu: React.FC<payload> = ({ isOpen, setValue, value }) => {
  return (
    <>
      {isOpen ? (
        <div className="bg-primary-300 p-3 w-96 rounded-lg">
          {categoriesWithColors.map((e) => (
            <button
              className={`  p-2 rounded-md m-1 ${
                value.includes(e.name)
                  ? "bg-white text-black"
                  : "bg-cyan-600 text-white"
              }`}
              value={e.name}
              onClick={() => setValue(e.name)}
            >
              {e.name}
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Menu;
