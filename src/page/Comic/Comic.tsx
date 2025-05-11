import { Link } from "react-router-dom";
import ComicContainer from "./ComicContainer";
import CardTitle from "../../components/card/CardTitle";
import { IStoriesResponse, IStory } from "../../type/comic";
import React from "react";
import ComicRank from "./ComicRank";

interface IPayload {
  Comming: IStoriesResponse;
  Recommend: IStoriesResponse;
  Rank: IStory[];
}

const Comic: React.FC<IPayload> = ({ Rank, Recommend, Comming }) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div>
        <CardTitle title="Comming soon" />
        <ComicContainer data={Comming} />
      </div>
      <div>
        <CardTitle title="Top truyện" />
        <ComicRank data={Rank} />
      </div>
      <div>
        <div className="flex items-center w-full justify-between">
          <CardTitle title="Đề xuất" />
          <Link to="/" className="text-cyan-500">
            Xem thêm
          </Link>
        </div>
        <ComicContainer data={Recommend} />
      </div>
    </div>
  );
};

export default Comic;
