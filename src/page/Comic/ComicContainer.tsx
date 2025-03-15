import { useRef, useState, useLayoutEffect } from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardComicDetail from "../../components/card/CardComicDetail";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const ITEMS_PER_GROUP = 6;

const ComicContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = fakedatadetail.length;
  const totalGroups = Math.ceil(totalItems / ITEMS_PER_GROUP);

  useLayoutEffect(() => {
    if (containerRef.current && itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth;
      const groupWidth = itemWidth * ITEMS_PER_GROUP;
      containerRef.current.scrollTo({
        left: groupWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const nextGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalGroups - 1 ? prevIndex + 1 : 0
    );
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalGroups - 1
    );
  };

  return (
    <div className="w-full h-auto rounded-lg py-2 relative">
      {/* Container cuộn ngang */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll snap-x scroll-smooth w-full scrollbar-hide"
      >
        {fakedatadetail.map((e, index) => (
          <div
            key={index}
            ref={index === 0 ? itemRef : null}
            className="snap-start flex-shrink-0 w-1/6"
          >
            <CardComicDetail data={e} message={""} />
          </div>
        ))}
      </div>

      {/* Nút bấm */}
      <button
        onClick={prevGroup}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-gray-950 text-white px-3 py-3 rounded"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextGroup}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-950 text-white px-3 py-3 rounded"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ComicContainer;
