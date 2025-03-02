import { Link } from "react-router-dom";
import ComicContainer from "./ComicContainer";

const Comic = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="p-1 mb-1 w-32 text-white rounded-sm bg-primary-200 text-center">
          Comming soon
        </p>
        <ComicContainer />
      </div>
      <div>
        <div className="flex items-center w-full justify-between">
          <p className="p-1 mb-1 w-32 text-white rounded-sm bg-primary-200 text-center">
            Lịch sử xem
          </p>
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
