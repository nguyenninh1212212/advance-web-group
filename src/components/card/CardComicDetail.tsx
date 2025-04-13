import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaComment } from "react-icons/fa";
import { IStory } from "../../type/comic";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice";

interface IPayload {
  data: IStory;
}

const CardComicDetail: React.FC<IPayload> = ({
  data: { id, title, coverImage, view, type, status, categories },
}) => {
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const statusTheme = useMemo(
    () =>
      ({
        COMING_SOON: "bg-yellow-500",
        UPDATING: "bg-primary-200",
        COMPLETED: "bg-blue-500",
      } as Record<string, string>),
    []
  );

  return (
    <div className="w-[220px] md:h-full h-[300px] max-md:w-[200px]  px-1  relative group rounded-md">
      <Link
        to={`/${title}/detail/${id}`}
        className="block w-full h-full overflow-hidden"
      >
        <div
          className={`items-center absolute flex justify-end  z-10 w-[97%] -mt-[1px]`}
        >
          <p
            className={`text-white text-xs rounded-sm  ${
              statusTheme[status] || "bg-gray-500"
            } px-2 py-1`}
          >
            {status}
          </p>
        </div>
        {/* Hình ảnh với hiệu ứng hover */}
        <div className="relative overflow-hidden rounded-md">
          <img
            src={`${coverImage}`}
            alt={title}
            className="w-full md:h-[300px] h-64 object-cover  transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hiển thị thông tin khi hover */}
          <div
            className={`absolute inset-0 md:[300px] rounded-md text-white bg-black bg-opacity-70  flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          >
            <div className="flex gap-2 mt-2 flex-col">
              <div className="flex items-center">
                <FaEye className="text-white h-4 w-4 mr-1" />
                <p className="text-xs">{view}</p>
              </div>
              <div className="flex items-center">
                <FaComment className="text-white h-4 w-4 mr-1" />
                <p className="text-xs">{type}</p>
              </div>

              <div className="flex items-center gap-1">
                {categories &&
                  categories.slice(0, 3).map((category, index) => (
                    <p
                      key={index}
                      className={`text-xs bg-gray-500 rounded-lg px-2 py-1`}
                    >
                      {category.name}
                    </p>
                  ))}
              </div>
            </div>

            {/* Nút đọc ngay */}
            <button
              onClick={(e) => {
                e.preventDefault(); // Ngăn chặn sự kiện điều hướng của Link
                navigate(`${title}/detail/${id}`);
              }}
              className="mt-3 bg-primary-500 px-4 py-1 text-sm rounded-lg hover:bg-primary-700 transition"
            >
              Đọc ngay
            </button>
          </div>
        </div>

        {/* Hiển thị tên truyện bên dưới */}
        <p className={` mt-2 line-clamp-2 ${theme.text}`}>{title}</p>
      </Link>
    </div>
  );
};

export default CardComicDetail;
