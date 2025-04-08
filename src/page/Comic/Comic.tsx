import { Link } from "react-router-dom";
import ComicContainer from "./ComicContainer";
import ComicRank from "./ComicRank";
import CardTitle from "../../components/card/CardTitle";

const Comic = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <div>
        <CardTitle title="Comming soon" />
        <ComicContainer />
      </div>
      <div>
        <CardTitle title="Top truyện" />
        <ComicRank />
      </div>
      <div>
        <div className="flex items-center w-full justify-between">
          <CardTitle title="Lịch sử xem" />
          <Link to="/" className="text-cyan-500">
            Xem thêm
          </Link>
        </div>
        <ComicContainer />
      </div>
    </div>
  );
};

export default Comic;
