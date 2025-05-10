import { useEffect, useMemo, useRef, useState } from "react";
import CardComichorizontal from "../../components/card/CardComichorizontal";
import { groupDataIntoFour } from "../../util/group/groupdata";
import { IStoriesResponse } from "../../type/comic";
import { useIsMobile } from "../../util/Mobile";

const ComicLastest = ({ data }: { data: IStoriesResponse }) => {
  const isMobile = useIsMobile(768);
  const groupdata = useMemo(
    () => groupDataIntoFour(data?.data, isMobile ? 1 : 4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-3">
      {/* Danh sách comic */}
      <div
        ref={scrollRef}
        className="flex md:overflow-hidden  overflow-x-auto gap-3 my-3 md:w-full w-full scrollbar-hide scroll-smooth"
      >
        {groupdata.map((group, _i) => (
          <div
            className="w-[100%] md:min-w-[200px] h-[500px] rounded-lg bg-gray-400 p-2 flex flex-col"
            key={_i}
          >
            {group.map((e, index) => (
              <div key={index} className="w-full py-1">
                <CardComichorizontal data={e} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Indicator dạng chấm */}
      <div className="flex gap-2 mt-2 md:hidden">
        {groupdata.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-purple-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ComicLastest;
