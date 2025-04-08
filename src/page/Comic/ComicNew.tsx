import CardComicDetail from "../../components/card/CardComicDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardTitle from "../../components/card/CardTitle";
import Pagination from "../../util/pagebar/page";

const ComicNew = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-2 relative ">
        <CardTitle title="Truyện mới" />

        <div className="flex"> {/* Dropdown menu */}</div>
      </div>

      {/* Comic list */}
      <div className="w-full h-auto  rounded-lg grid md:grid-cols-5  gap-4 pt-4 grid-cols-2">
        {fakedatadetail.map((e, _i) => (
          <div key={_i} className="snap-start flex justify-center items-center">
            <CardComicDetail data={e} message="" />
          </div>
        ))}
      </div>
      <center>
        <Pagination initialPage={1} initialLimit={10} totalItem={100} />
      </center>
    </>
  );
};

export default ComicNew;
