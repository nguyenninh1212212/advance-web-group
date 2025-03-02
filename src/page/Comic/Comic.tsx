import ComicContainer from "./ComicContainer";

const Comic = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="p-1 mb-1 w-32 text-white rounded-sm bg-primary-200 text-center">
          Yêu Thích
        </p>
        <ComicContainer />
      </div>
      <div>
        <p className="p-1 mb-1 w-32 text-white rounded-sm bg-primary-200 text-center">
          Lịch sử xem
        </p>
        <ComicContainer />
      </div>
    </div>
  );
};

export default Comic;
