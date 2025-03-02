import { FaFilter } from "react-icons/fa";
import CardComicDetail from "../../components/card/CardComicDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";

const ComicNew = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <p className="py-2 px-3 mb-1 w-auto text-white rounded-sm bg-primary-200 text-center">
          Truyện mới
        </p>
        <FaFilter />
      </div>
      <div className="w-full h-auto bg-white border rounded-lg grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 pt-4">
        {fakedatadetail.map((e, _i) => (
          <div key={_i} className="snap-start flex justify-center items-center">
            <CardComicDetail data={e} message={""} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ComicNew;
