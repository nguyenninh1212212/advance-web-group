import { FaUsers } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { payload } from "../../type/comic";

const Cardhorizontal: React.FC<payload> = ({ data }) => {
  console.log(data);

  return (
    <Link
      to={"/"}
      className="flex items-center bg-zinc-900 text-white p-3 rounded-lg w-[100%] "
    >
      {/* Hình ảnh */}
      <img
        src="https://mangadex.org/covers/a065cc09-cc6a-472c-8ea8-b9e538bacaa4/fd210e0d-377f-4046-a1fd-fa6b81046f5c.jpg.512.jpg"
        alt="Thumbnail"
        className="w-12 h-16 rounded-md object-cover"
      />

      <div className="ml-3 flex-1">
        <h2 className="text-sm font-bold truncate w-48">
          Bocchi the Rock! Gaiden: Ki...
        </h2>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
              <span>🇮🇩</span>
              <span className="font-semibold">Ch. 38</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <FaUsers />
              <span>No Group</span>
            </div>
          </div>
          <div className="flex  text-xs text-gray-400 gap-1">
            <IoTime className="text-base" />
            <span>3 minutes ago</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardhorizontal;
