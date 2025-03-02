import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaComment, FaHeart } from "react-icons/fa";
import { formatNumber } from "../../customFunc/formatNumber";

interface payload {
  data: {
    id: string;
    title: string;
    chapter: string[];
    image: string;
    time: string[];
    view: number;
    cmt: number;
    like: number;
  };
  message: string;
}

const CardComicDetail: React.FC<payload> = ({ data }) => {
  const { id, title, chapter, image, time, view, cmt, like } = data;
  return (
    <div className="w-40 h-72 overflow-hidden mx-1">
      <Link 
        to={`/comicdetail/${id}`}
        state={{ data }}
      >
        <img src={`${image}`} alt="" className="w-full h-44" />
        <div className="relative bg-black text-white bg-opacity-60 w-full h-auto flex flex-col items-between justify-center">
          <section className="line-clamp-2 grid grid-cols-3 ml-1">
            <div className="flex items-center">
              <FaEye className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{formatNumber(view)}</p>
            </div>
            <div className="flex items-center">
              <FaComment className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{formatNumber(cmt)}</p>
            </div>
            <div className="flex items-center">
              <FaHeart className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{formatNumber(like)}</p>
            </div>
          </section>
        </div>

        <div>
          <section className="line-clamp-2">{title}</section>
          <section className="text-xs flex flex-col gap-2">
            {chapter.map((chap, index) => (
              <div key={index} className="flex justify-between hover:text-blue-500 transition-colors duration-300"> 
                <Link to = {`/${chap}:${index}`} >
                  <p className="hover:underline">{chap}</p>
                </Link>
                <p className="text-gray-400">{time[index]}</p>
              </div>
            ))}
          </section>
        </div>
      </Link>
    </div>
  );
};

export default CardComicDetail;
