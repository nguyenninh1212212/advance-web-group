import React from "react";
import { Icard, IStory } from "../../type/comic";
import { Link } from "react-router-dom";

interface payload {
  data: IStory;
}

const CardSearchResult: React.FC<payload> = ({ data }) => {
  const { coverImage, title, id } = data;
  return (
    <Link
      to={`/${title}/detail/${id}`}
      className="flex items-center  p-4  w-full hover:scale-95 transition-all flex-wrap"
    >
      {/* Ảnh */}
      <div className="w-[20%] h-[100px] flex">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Nội dung */}
      <div className="ml-4 text-gray-300 flex-1 min-w-0 h-full">
        <h2 className="text-lg font-bold text-white truncate">{title}</h2>
      </div>
    </Link>
  );
};

export default CardSearchResult;
