import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IStory } from "../../type/comic";
import { useTheme } from "../../util/theme/theme";

interface IPayload {
  data: IStory[];
}

const ComicRank: React.FC<IPayload> = ({ data }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div className="overflow-x-auto md:overflow-x-hidden flex justify-center items-center py-2 scrollbar-hide w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3 px-4 w-full">
        {data.map((e, _i) => (
          <div
            key={_i}
            className={`flex items-center gap-3 p-3 rounded-lg ${theme.background} hover:bg-gray-400  hover:relative hover:scale-110 transition cursor-pointer`}
            onClick={() => navigate(`/${e.title}/detail/${e.id}`)}
          >
            {/* Hình ảnh */}
            <img
              src={e.coverImage}
              alt={e.title}
              className="w-[100px] h-[140px] md:w-[120px] md:h-[160px] lg:w-[150px] lg:h-[200px] rounded-lg object-cover"
            />

            {/* Thông tin */}
            <div className="flex-1">
              <p className={`text-2xl md:text-4xl font-bold ${theme.text}`}>
                {_i + 1}.
              </p>
              <p className={` font-semibold ${theme.text}`}>{e.title}</p>
              <p className="flex items-center gap-2 text-gray-300">
                {e.view} <FaHeart className="text-red-500" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicRank;
