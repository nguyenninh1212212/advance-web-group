import React, { useState } from "react";
import { Icard } from "../../type/comic";
import { category } from "../../util/category";
import { useNavigate } from "react-router-dom";

interface payload {
  data: Icard;
}

const CardCreateStory: React.FC<payload> = ({ data }) => {
  const { image, title } = data;
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);
  const navigate = useNavigate();

  const handleAddChapter = () => {
    navigate(`/my/stories/${title}/chapter/add`);
  };

  return (
    <div className="bg-gray-600 rounded-lg flex my-4 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-auto">
      <img src={image} alt="" className="w-[150px] h-50" />

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="md:text-xl text-lg font-semibold text-white ">
            {title}
          </h2>

          <p
            className={`text-gray-400 md:text-sm text-xs mt-2 ${
              showMore ? "" : "line-clamp-2"
            }`}
          >
            This probably Feat Two be called tagline instead Seventy Three •
            Feat Forty Five • Feat One • Feat Two • Feat One Hundred • Seventy
            Three • Feat Forty Five • Feat One • Feat Two • Feat One Hundred •
            Seventy Three • Feat Forty Five • Feat
          </p>

          {/* Nút "More" / "Less" */}
          <button
            className="text-blue-400 text-sm mt-1"
            onClick={toggleShowMore}
          >
            {showMore ? "Less" : "More"}
          </button>
        </div>

        <div className="flex items-center space-x-2 my-2">
          {category.slice(0, 3).map((item, index) => (
            <button
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm"
            >
              {item.value}
            </button>
          ))}
        </div>
        <button
          onClick={handleAddChapter}
          className="bg-indigo-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition "
        >
          + Thêm Chapter
        </button>
      </div>
    </div>
  );
};

export default CardCreateStory;
