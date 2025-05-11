import "dayjs/locale/vi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoTime } from "react-icons/io5";
import React from "react";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const formatCountDay: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="flex text-xs text-gray-400 gap-1">
      <IoTime className="text-base" />
      <span className="line-clamp-2">{dayjs(date).fromNow()}</span>
    </div>
  );
};
