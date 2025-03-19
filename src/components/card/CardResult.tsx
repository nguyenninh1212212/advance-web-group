import React from "react";
import { Icard } from "../../type/comic";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

interface payload {
  data: Icard;
}

const CardResult: React.FC<payload> = ({ data }) => {
  const { image, like, title, chapter, id } = data;
  return (
    <Link
      to={`/${title}/detail/${id}`}
      className="flex items-center bg-gray-900 p-4 rounded-lg w-full hover:scale-95 transition-all flex-wrap"
    >
      <img src={image} alt={title} className="w-[20%] h-[150px] rounded-md " />

      {/* Nội dung */}
      <div className="ml-4 text-gray-300">
        {/* Tiêu đề */}
        <h2 className="text-lg font-bold text-white">{title}</h2>

        {/* Thể loại */}
        <p className="text-sm opacity-80 flex gap-2 items-center">
          {like} <FaHeart />
        </p>

        {/* Lịch phát hành & số tập */}
        <p className="text-sm opacity-60">{chapter} Episodes</p>
      </div>
    </Link>
  );
};

export default CardResult;
