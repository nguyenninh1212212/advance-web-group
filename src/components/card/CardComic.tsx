import React from "react";
import { Link } from "react-router-dom";

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
const CardComic: React.FC<payload> = ({ data }) => {
  const { id, title, chapter, image, time, view, cmt, like } = data;
  return (
    <div className="w-48 h-44 overflow-hidden  mx-1">
      <Link 
        to={`/comicdetail/${id}`}
        state={{ data }}
      >
        <img src={`${image}`} alt="" className="w-44 h-44" />
        <div className="relative bottom-12 bg-black text-white bg-opacity-60 w-44 h-12 flex flex-col items-center justify-center">
          <section className="line-clamp-2">{title}</section>
          <section className="text-xs flex gap-2">
            <p>{chapter}</p>
            <p>{time}</p>
          </section>
        </div>
      </Link>
    </div>
  );
};

export default CardComic;
