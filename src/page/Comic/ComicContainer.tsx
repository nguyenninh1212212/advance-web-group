import { useRef, useState, useEffect } from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardComicDetail from "../../components/card/CardComicDetail";
import { groupData } from "../../util/group/groupdata";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

const ComicContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const groupedData = groupData(fakedatadetail, 6);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const nextGroup = () => {
    if (currentIndex < groupedData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevGroup = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full h-auto rounded-lg py-2  relative">
      {/* Container cuộn ngang */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden snap-x scroll-smooth w-full"
      >
        {groupedData.map((group, groupIndex) => (
          <div key={groupIndex} className="flex min-w-full  ">
            {group.map((e, itemIndex) => (
              <div key={itemIndex} className="snap-start">
                <CardComicDetail data={e} message={""} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={prevGroup}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-3 rounded"
        disabled={currentIndex === 0}
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextGroup}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-3 rounded"
        disabled={currentIndex === groupedData.length - 1}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ComicContainer;
