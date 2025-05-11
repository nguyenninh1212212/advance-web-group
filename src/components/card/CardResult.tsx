import React from "react";
import { ICategory, IStory } from "../../type/comic";
import { Link } from "react-router-dom";
import { FaEye, FaHeart } from "react-icons/fa";
import { TiTime } from "react-icons/ti";

interface Payload {
  data: IStory;
}

const CardResult: React.FC<Payload> = ({ data }) => {
  const { categories, coverImage, createdAt, id, title, view } = data;

  return (
    <Link
      to={`/${title}/detail/${id}`}
      className="flex flex-wrap bg-gray-900 md:p-4 max-md:flex-col rounded-md w-full hover:scale-95 transition-all gap-1 md:gap-4 overflow-hidden relative"
    >
      {/* Ảnh */}
      <section className="md:w-[20%] min-w-[80px] max-md:h-[300px] h-40 flex">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover md:rounded-md"
        />
      </section>

      {/* Nội dung */}
      <section className="flex-1 min-w-0 text-gray-300 flex flex-col md:gap-2 max-md:p-1 max-md:-mt-7 relative">
        {/* Lớp phủ mờ cho phần chữ (chỉ hiện trên mobile) */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm p-2 max-md:block md:hidden"></div>

        <h2 className="text-lg font-bold text-white max-md:text-xs truncate relative">
          {title}
        </h2>
        <p className="text-sm opacity-80 flex gap-2 items-center max-md:text-[10px] max-md:hidden relative">
          <FaHeart /> {view}
        </p>
        <p className="text-sm opacity-60 max-md:text-[10px] max-md:hidden relative">
          {createdAt}
        </p>
        <div className="flex md:gap-2 w-full justify-between text-sm opacity-60 flex-wrap max-md:text-[10px] max-md:hidden relative">
          <p className="flex items-center gap-2 max-md:text-[10px]">
            <FaEye /> {view}
          </p>
          {categories.map((e: ICategory) => (
            <p className="flex items-center gap-2 max-md:text-[10px] max-md:hidden">
              <TiTime /> {e.name}
            </p>
          ))}
        </div>
      </section>
    </Link>
  );
};

export default CardResult;
