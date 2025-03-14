import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaComment, FaHeart } from "react-icons/fa";
import { formatNumber } from "../../util/format/formatNumber";
import { payload } from "../../type/comic";

const CardComicDetail: React.FC<payload> = ({ data }) => {
  const { id, title, image, view, cmt, like } = data;
  return (
    <div className="w-48 h-64 overflow-hidden mx-1 pb-10">
      <Link to={`${title}/detail/${id}`} state={{ data }}>
        <img src={`${image}`} alt="" className="w-full h-full" />
        <div className="relative bg-black text-white bg-opacity-60 w-full h-auto flex flex-col items-between justify-center">
          <section className="line-clamp-2 grid grid-cols-3 ml-1">
            <div className="flex items-center">
              <FaEye className="text-white h-3 w-3 flex-shrink-0" />
              <p className="text-xs">{formatNumber(view)}</p>
            </div>
            <div className="flex items-center">
              <FaComment className="text-white h-3 w-3 flex-shrink-0" />
              <p className="text-xs">{formatNumber(cmt)}</p>
            </div>
            <div className="flex items-center">
              <FaHeart className="text-white h-3 w-3 flex-shrink-0" />
              <p className="text-xs">{formatNumber(like)}</p>
            </div>
          </section>
        </div>

        <div>
          <section className="line-clamp-2 text-white">{title}</section>
        </div>
      </Link>
    </div>
  );
};

export default CardComicDetail;
