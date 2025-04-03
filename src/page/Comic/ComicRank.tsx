import React from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ComicRank = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto md:overflow-x-hidden flex justify-center items-center py-2 scrollbar-hide w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3 px-4 w-full">
        {fakedatadetail
          .slice(0, 9)
          .sort((a, b) => b.like - a.like)
          .map((e, _i) => (
            <div
              key={_i}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 hover:relative hover:scale-110 transition cursor-pointer"
              onClick={() => navigate(`/${e.title}/detail/${e.id}`)}
            >
              {/* Hình ảnh */}
              <img
                src={e.image}
                alt={e.title}
                className="w-[100px] h-[140px] md:w-[120px] md:h-[160px] lg:w-[150px] lg:h-[200px] rounded-lg object-cover"
              />

              {/* Thông tin */}
              <div className="flex-1">
                <p className="text-2xl md:text-4xl font-bold text-white">
                  {_i + 1}.
                </p>
                <p className="text-white font-semibold">{e.title}</p>
                <p className="flex items-center gap-2 text-gray-300">
                  {e.like} <FaHeart className="text-red-500" />
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ComicRank;
