import CardComicDetail from "../../components/card/CardComicDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { useState } from "react";
import Page from "../../util/pagebar/page";
import CardTitle from "../../components/card/CardTitle";

const ComicNew = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div className="flex justify-between items-center mt-2 relative ">
        <CardTitle title="Truyện mới" />

        <div className="flex"> {/* Dropdown menu */}</div>
      </div>

      {/* Comic list */}
      <div className="w-full h-auto  rounded-lg grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 pt-4">
        {fakedatadetail.map((e, _i) => (
          <div key={_i} className="snap-start flex justify-center items-center">
            <CardComicDetail data={e} message="" />
          </div>
        ))}
      </div>
      <center>
        <Page page={page} limit={10} total={20} setPage={setPage} />
      </center>
    </>
  );
};

export default ComicNew;
