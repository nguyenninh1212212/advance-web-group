import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "../../util/theme/theme";

interface Payload {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Popup: React.FC<Payload> = ({
  isOpen,
  setIsOpen,
  children,
  backgroundColor,
}) => {
  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={` p-3 gap-2 flex-col flex rounded-lg shadow-lg mx-4   overflow-y-auto scrollbar-hide ${theme.header} `}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="self-end" onClick={() => setIsOpen(!isOpen)}>
          ❌
        </button>

        {children}
      </div>
    </div>
  );
};

export default Popup;
