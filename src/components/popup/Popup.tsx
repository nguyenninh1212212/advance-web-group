import React, { Dispatch, SetStateAction } from "react";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`bg-black p-5 gap-2 flex-col flex rounded-lg shadow-lg w-1/2 h-auto max-h-1/2 max-md:w-4/5 max-md:max-h-3/5 overflow-y-auto scrollbar-hide ${backgroundColor} `}
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
