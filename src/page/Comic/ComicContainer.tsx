import { useRef } from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardComicDetail from "../../components/card/CardComicDetail";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const ComicContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const nextItem = () => {
    if (containerRef.current && itemRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const itemWidth = itemRef.current.offsetWidth;

      if (scrollLeft + clientWidth >= scrollWidth - itemWidth) {
        // Nếu đang ở cuối danh sách, quay lại đầu
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Cuộn sang phải
        containerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }
  };

  const prevItem = () => {
    if (containerRef.current && itemRef.current) {
      const { scrollLeft } = containerRef.current;
      const itemWidth = itemRef.current.offsetWidth;

      if (scrollLeft <= 0) {
        // Nếu đang ở đầu danh sách, cuộn đến cuối
        containerRef.current.scrollTo({
          left: containerRef.current.scrollWidth,
          behavior: "smooth",
        });
      } else {
        // Cuộn sang trái
        containerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="px-1/6 h-auto rounded-lg py-2 relative w-full">
      {/* Container cuộn ngang với scrollbar */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x scroll-smooth w-full "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: " #cbd5e0 transparent  ",
          scrollMarginLeft: "10px",
        }}
      >
        {fakedatadetail.map((e, index) => (
          <div
            key={index}
            ref={index === 0 ? itemRef : null}
            className="snap-start flex-shrink-0"
          >
            <CardComicDetail data={e} message={""} />
          </div>
        ))}
      </div>

      {/* Nút bấm */}
      <button
        onClick={prevItem}
        className="absolute md:-left-3 -left-0 top-[44%] transform -translate-y-1/2 bg-gray-950 text-white px-3 py-3 rounded"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextItem}
        className="absolute md:-right-3 -right-0 top-[44%]  transform -translate-y-1/2 bg-gray-950 text-white px-3 py-3 rounded"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ComicContainer;
