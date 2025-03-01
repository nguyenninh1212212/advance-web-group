import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


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
    <div className="w-44 h-72 overflow-hidden mx-1">
      <Link to={`/${id}`}>
        <img src={`${image}`} alt="" className="w-44 h-44" />
        <div className="relative bg-black text-white bg-opacity-60 w-full h-auto flex flex-col items-between justify-center">
          <section className="line-clamp-2 grid grid-cols-3 ml-1">
            <div className="flex items-center">
              <FaEye className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{view}</p>
            </div>
            <div className="flex items-center">
              <FaComment className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{cmt}</p>
            </div>
            <div className="flex items-center">
              <FaHeart className="text-white h-3 w-3 flex-shrink-0"/>
              <p className="text-xs">{like}</p>
            </div>

          </section>
        </div>

        <div>
          <section className="line-clamp-2">{title}</section>
          <section className="text-xs flex flex-col gap-2">
            {chapter.map((chap, index) => (
              <div key={index}>
                <Link to = {`/${chap}:${index}`} className="flex justify-between hover:text-blue-500 transition-colors duration-300">
                  <p>{chap}</p>
                  <p>{time[index]}</p>
                </Link>
              </div>
            ))}
          </section>
        </div>
      </Link>
    </div>
  );
};

export default CardComicDetail;
