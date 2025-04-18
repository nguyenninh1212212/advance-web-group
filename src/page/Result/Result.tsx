import React, { useEffect } from "react";
import Pagination from "../../util/pagebar/page";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardComicDetail from "../../components/card/CardComicDetail";

const Result = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  // Random danh sách truyện
  const shuffledData = [...fakedatadetail]
    .sort(() => Math.random() - 0.5)
    .slice(0, 9);

  return (
    <div className="mb-4 flex-col flex">
      <section className="gap-2 items-center grid grid-cols-5">
        {shuffledData.map((e, _i) => (
          <CardComicDetail data={e} key={_i} message="" />
        ))}
      </section>
      <Pagination initialLimit={10} initialPage={1} totalItem={10} />
    </div>
  );
};

export default Result;
