import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaComment, FaHeart } from "react-icons/fa";
import { formatNumber } from "../../util/format/formatNumber";
import { payload } from "../../type/comic";

const CardComicDetail: React.FC<payload> = ({ data }) => {
  const navigate = useNavigate();
  const { id, title, image, view, cmt, like } = data;

  return (
    <div className="w-[100%] h-[100%]  px-1  relative group rounded-xl">
      <Link
        to={`${title}/detail/${id}`}
        state={{ data }}
        className="block w-full h-full overflow-hidden"
      >
        {/* Hình ảnh với hiệu ứng hover */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={`${image}`}
            alt={title}
            className="w-full h-64 object-cover  transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hiển thị thông tin khi hover */}
          <div className="absolute inset-0 h-64 bg-black bg-opacity-70 text-white flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
            <div className="flex gap-2 mt-2">
              <div className="flex items-center">
                <FaEye className="text-white h-4 w-4 mr-1" />
                <p className="text-xs">{formatNumber(view)}</p>
              </div>
              <div className="flex items-center">
                <FaComment className="text-white h-4 w-4 mr-1" />
                <p className="text-xs">{formatNumber(cmt)}</p>
              </div>
              <div className="flex items-center">
                <FaHeart className="text-white h-4 w-4 mr-1" />
                <p className="text-xs">{formatNumber(like)}</p>
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
        <p className="  text-white mt-2 line-clamp-2">{title}</p>
      </Link>
    </div>
  );
};

export default CardComicDetail;
