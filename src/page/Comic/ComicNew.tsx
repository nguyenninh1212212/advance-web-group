import CardComicDetail from "../../components/card/CardComicDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { useState } from "react";
import Page from "../../util/pagebar/page";
import CardTitle from "../../components/card/CardTitle";

const ComicNew = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

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
        <Page
          page={page}
          limit={limit}
          total={20}
          setPage={setPage}
          setLimit={setLimit}
        />
      </center>
    </>
  );
};

export default ComicNew;
