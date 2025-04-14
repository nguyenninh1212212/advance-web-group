import React, { useState } from "react";
import { IStory } from "../../type/comic";
import { useNavigate } from "react-router-dom";

interface payload {
  data: IStory;
}

const CardCreateStory: React.FC<payload> = ({ data }) => {
  const {
    categories,
    coverImage,
    createdAt,
    id,
    status,
    type,
    updatedAt,
    view,
    title,
  } = data;
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);
  const navigate = useNavigate();

  const handleAddChapter = () => {
    navigate(`/my/stories/${title}/chapter/add`);
  };

  return (
    <div className="bg-gray-600 rounded-lg flex my-4 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-auto">
      <img src={coverImage} alt="" className="w-[150px] h-50" />

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
            {createdAt}
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
          {categories.map((item, index) => (
            <button
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm"
            >
              {item.name}
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
