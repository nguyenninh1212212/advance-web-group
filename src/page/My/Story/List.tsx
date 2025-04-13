import React from "react";
import { IoChevronBackOutline, IoAddOutline } from "react-icons/io5";
import CardCreateStory from "../../../components/card/CardCreateStory";
import { fakedatadetail } from "../../../FakeData/FakedataDetail";
import { Link } from "react-router-dom";
import { useTheme } from "../../../util/theme/theme";

const List = () => {
  const theme = useTheme();
  return (
    <div className={`min-h-screen   my-2 ${theme.background}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button className={`${theme.background} hover:text-white`}>
            <IoChevronBackOutline className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">My MDLists</h1>
        </div>
      </div>

      {/* Tabs Section */}

      {/* New MDList Button */}
      <div className="flex justify-center py-4">
        <Link
          to={"/my/stories/create"}
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <IoAddOutline className="w-5 h-5" />
          <span> Thêm truyện</span>
        </Link>
      </div>
      {fakedatadetail.slice(0, 3).map((item, index) => (
        <CardCreateStory key={index} data={item} />
      ))}

      {/* MDList Items */}
    </div>
  );
};

export default List;
