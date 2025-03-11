import React, { Dispatch, SetStateAction } from "react";

interface Payload {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Popup: React.FC<Payload> = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white p-5 rounded-lg shadow-lg w-1/2 h-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
