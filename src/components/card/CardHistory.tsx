import React from "react";
import { Icard } from "../../type/comic";
import { Link } from "react-router-dom";
import { useTheme } from "../../util/theme/theme";

interface payload {
  data: Icard;
}

const CardHistory: React.FC<payload> = ({ data }) => {
  const { chapters, story } = data;
  const { background_card } = useTheme();
  return (
    <Link
      to={`/${story.title}/detail/${story.id}`}
      className="flex  bg-gray-900 rounded-xl p-4  w-full hover:scale-95 transition-all flex-wrap"
    >
      {/* Ảnh */}
      <div className="w-[14%] h-1/2 flex">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Nội dung */}
      <div className="ml-4 text-gray-300 flex-1 min-w-0 h-full ">
        <div className="p-2  border-b border-b-white">
          <h2 className="text-lg font-bold text-white truncate">
            {story.title}
          </h2>
        </div>
        <div className="text-sm backdrop-blur-md p-2">
          {chapters.map((e) => (
            <p
              className={`w-full p-2 my-1 bg-black bg-opacity-50 rounded-lg text-white ${background_card}`}
            >
              {e.title}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CardHistory;
