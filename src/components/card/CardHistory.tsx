import React from "react";
import { Icard } from "../../type/comic";
import { Link } from "react-router-dom";

interface payload {
  data: Icard;
}

const CardHistory: React.FC<payload> = ({ data }) => {
  const { image, title, chapter, id } = data;
  return (
    <Link
      to={`/${title}/detail/${id}`}
      className="flex  bg-gray-900 rounded-xl p-4  w-full hover:scale-95 transition-all flex-wrap"
    >
      {/* Ảnh */}
      <div className="w-[14%] h-1/2 flex">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Nội dung */}
      <div className="ml-4 text-gray-300 flex-1 min-w-0 h-full ">
        <div className="p-2  border-b border-b-white">
          <h2 className="text-lg font-bold text-white truncate">{title}</h2>
        </div>
        <p className="text-sm opacity-60 p-2">{chapter} Episodes</p>
      </div>
    </Link>
  );
};

export default CardHistory;
