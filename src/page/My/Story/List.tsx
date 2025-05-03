import React from "react";
import { IoChevronBackOutline, IoAddOutline } from "react-icons/io5";
import CardCreateStory from "../../../components/card/CardCreateStory";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getMyList } from "../../../api/stories";
import ClipLoader from "react-spinners/ClipLoader";
import { IStory } from "../../../type/comic";
import { FaTrash } from "react-icons/fa6";

const List = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list"],
    queryFn: () => getMyList(),
  });
  console.log("🚀 ~ List ~ error:", error);
  console.log("🚀 ~ List ~ data:", data);
  const theme = useTheme();
  const navigate = useNavigate();
  if (isLoading)
    return (
      <div>
        {" "}
        <ClipLoader
          color={"gray"}
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className={`min-h-screen   my-2 ${theme.background}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button className={`${theme.background} hover:text-white`}>
            <IoChevronBackOutline className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">My Lists</h1>
        </div>
        <div
          className="flex items-center space-x-1"
          onClick={() => navigate("/my/list/trash")}
        >
          <h1 className="text-xl font-semibold max-md:invisible">Thùng rác</h1>
          <button className={`${theme.background} hover:text-white `}>
            <FaTrash className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs Section */}

      {/* New MDList Button */}
      <div className="flex justify-center py-4">
        <Link
          to={"/my/list/create"}
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <IoAddOutline className="w-5 h-5" />
          <span> Thêm truyện</span>
        </Link>
      </div>
      {data?.data.map((item: IStory) => (
        <CardCreateStory key={item.id} data={item} />
      ))}

      {/* MDList Items */}
    </div>
  );
};

export default List;
