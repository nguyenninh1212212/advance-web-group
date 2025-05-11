import { IoChevronBackOutline } from "react-icons/io5";

import { useTheme } from "../../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getMyTrashList } from "../../../api/stories";
import ClipLoader from "react-spinners/ClipLoader";
import { IStory } from "../../../type/comic";
import { useNavigate } from "react-router-dom";
import CardDeleteStory from "../../../components/card/CardDeleteStory";

const TrashList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trash-list"],
    queryFn: () => getMyTrashList(),
  });
  console.log("🚀 ~ TrashList ~ data:", data);
  const navigative = useNavigate();
  const theme = useTheme();

  if (isLoading)
    return (
      <div>
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
    <div className={`min-h-screen my-2 ${theme.background}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            className={`${theme.background} hover:text-white`}
            onClick={() => navigative("/my/list")}
          >
            <IoChevronBackOutline className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Thùng rác</h1>
        </div>
      </div>

      {/* Trash List Items */}
      {data?.data.length > 0 ? (
        data?.data.map((item: IStory) => (
          <CardDeleteStory key={item.id} data={item} />
        ))
      ) : (
        <p className="py-3 text-center">Không có truyện nào bị xóa</p>
      )}
    </div>
  );
};

export default TrashList;
