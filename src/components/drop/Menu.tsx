import React from "react";
import { categoriesWithColors } from "../../util/category";

interface payload {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValue: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const Menu: React.FC<payload> = ({ isOpen, setIsValue }) => {
  return (
    <>
      {isOpen ? (
        <div className="bg-primary-400 p-3 w-96 rounded-lg">
          {categoriesWithColors.map((e) => (
            <button
              className={`text-black bg-white p-2 rounded-md m-1`}
              value={e.name}
              onClick={() => setIsValue(e.name)}
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
