import React from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ComicRank = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 justify-center gap-4 my-3 ">
      {fakedatadetail
        .slice(0, 9)
        .sort((a, b) => b.like - a.like)
        .map((e, _i) => (
          <div
            className="flex items-center text-white gap-2 self-center cursor-pointer"
            onClick={() => navigate(`/${e.title}/detail/${e.id}`)}
          >
            <div key={_i} className="flex gap-2 items-center">
              <img src={e.image} alt="" className="w-28 h-40 rounded-lg" />
              <p className="font-bold text-5xl">{_i + 1}</p>

              <div>
                <p className="">{e.title}</p>
                <p className="flex items-center gap-2">
                  {e.like} <FaHeart />
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ComicRank;
