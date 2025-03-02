import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardComicDetail from "../../components/card/CardComicDetail";

const ComicContainer = () => {
  return (
    <div className="w-full h-auto bg-white rounded-lg flex py-2  overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-proximity ">
      {fakedatadetail.map((e, _i) => (
        <div key={_i} className="snap-start ">
          <CardComicDetail data={e} message={""} />
        </div>
      ))}
    </div>
  );
};

export default ComicContainer;
