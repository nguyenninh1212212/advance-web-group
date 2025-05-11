import { FaUsers } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IStory } from "../../type/comic";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { FiType } from "react-icons/fi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const Cardhorizontal: React.FC<{ data: IStory }> = ({ data }) => {
  const { id, coverImage, title, updatedAt, type } = data;
  const cleanUpdatedAt = updatedAt.split("[")[0]; // bỏ phần `[Asia/Saigon]`

  return (
    <Link
      to={`/${title}/detail/${id}`}
      className="flex items-center bg-zinc-900 text-white rounded-md p-3 overflow-hidden"
    >
      <img
        src={coverImage}
        alt="Thumbnail"
        className="w-12 h-16 rounded-md object-cover"
      />

      <div className="ml-3 flex-1">
        <h2 className="text-sm font-bold truncate w-48 line-clamp-3">
          {title}
        </h2>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex text-xs text-gray-400 gap-1">
              <FiType className="text-base" />
              <span className="line-clamp-2">{type}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <FaUsers />
              <span>No Group</span>
            </div>
          </div>

          <div className="flex text-xs text-gray-400 gap-1">
            <IoTime className="text-base" />
            <span className="line-clamp-2">
              {dayjs(cleanUpdatedAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardhorizontal;
