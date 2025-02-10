import React from "react";
import { LayoutRouteProps } from "react-router-dom";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <>
      <div className=" w-screen fixed top-4 item-center justify-center flex z-50">
        <div className="w-[1200px] bg-red-500 h-16 rounded-md">Header</div>
      </div>
      <div className="pt-28 w-[1200px] m-auto ">{children}</div>
    </>
  );
};

export default Header;
