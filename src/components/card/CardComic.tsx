import React from "react";
import { Link } from "react-router-dom";

interface payload {
  data: {
    id: string;
    title: string;
    chapter: string[];
    image: string;
    time: string;
  };
  message: string;
}
const CardComic: React.FC<payload> = ({ data }) => {
  const { id, title, chapter, image, time } = data;
  return (
    <div className="w-40 h-56 overflow-hidden  mx-1">
      <Link to={`${title}/detail/${id}`} state={{ data }}>
        <img src={`${image}`} alt="" className="w-44 h-56" />
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
