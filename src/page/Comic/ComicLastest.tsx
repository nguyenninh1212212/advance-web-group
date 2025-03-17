import { useEffect, useRef, useState } from "react";
import CardComichorizontal from "../../components/card/CardComichorizontal";
import { groupDataIntoFour } from "../../util/group/groupdata";
import { fakedatadetail } from "../../FakeData/FakedataDetail";

const ComicLastest = () => {
  const groupdata = groupDataIntoFour(fakedatadetail, 4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Xử lý sự kiện cuộn ngang
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
        className="flex overflow-x-auto gap-3 my-3 md:w-full w-full scrollbar-hide scroll-smooth"
      >
        {groupdata.map((group, _i) => (
          <div
            className="min-w-full md:min-w-[300px] h-[500px] rounded-lg bg-gray-400 p-2 flex flex-col"
            key={_i}
          >
            {group.map((e, index) => (
              <div key={index} className="w-full py-1">
                <CardComichorizontal data={e} message={""} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Indicator dạng chấm */}
      <div className="flex gap-2 mt-2">
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
