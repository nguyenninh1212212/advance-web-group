import React, { useEffect, useState } from "react";
import Pagination from "../../util/pagebar/page";
import CardResult from "../../components/card/CardResult";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Icard } from "../../type/comic";

interface payload {
  data: Icard[];
}
const ResultDetail: React.FC<payload> = ({ data }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => window.scrollTo(0, 0), []);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const shuffledData = [...data].sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold border-b w-fit">
          {selectedCategory}
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        {shuffledData.map((e, _i) => (
          <CardResult data={e} key={_i} />
        ))}
      </div>
      <Pagination
        limit={limit}
        page={page}
        total={30}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default ResultDetail;
