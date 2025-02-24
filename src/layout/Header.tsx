import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import { GrSearch } from "react-icons/gr";
import { LayoutRouteProps } from "react-router-dom";
import { icon } from "../constant";

const Header: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <>
      <div className=" w-screen fixed top-4 item-center justify-center flex z-50 ">
        <div className="w-[1200px] bg-primary-100 h-[70px] rounded-md flex justify-between items-center gap-2 overflow-hidden p-3">
          <div className="w-1/5 flex items-center text-white font-bold gap-2">
            <img src={icon.logo} alt="" className="w-16 h-16 rounded-full" />
            <p>Tư Bản Truyện</p>
          </div>

          {/**/}
          <div className="flex border-r-2 border-l-2 justify-between px-2 w-3/5">
            <div className="flex bg-stone-500 items-center px-1 w-3/4 gap-2  rounded-lg">
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm kiếm truyện....."
                className="w-full h-8 bg-stone-500  outline-none"
              />
              <GrSearch className="text-black text-xl" />
            </div>
            <button className="text-white text-3xl">
              <CgMenuGridO />
            </button>
          </div>
          {/**/}

          <div className="w-1/5 flex justify-evenly gap-2">
            <button className=" bg-cyan-400 text-white p-2 text-sm font-light rounded-md w-28">
              Đăng ký
            </button>
            <button className=" bg-cyan-400 text-white p-2 text-sm font-light rounded-md w-28">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      <div className="pt-28 w-[1200px] m-auto ">{children}</div>
    </>
  );
};

export default Header;
