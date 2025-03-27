import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../util/pagebar/page";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardResult from "../../components/card/CardResult";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ResultDetail = () => {
  const [page, setPage] = useState<number>(1);
  useEffect(() => window.scrollTo(0, 0), []);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const shuffledData = [...fakedatadetail]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
          onClick={() => navigate("/")} // Quay lại trang trước
        >
          ← Quay lại
        </button>
        <h1 className="text-4xl font-bold border-b w-fit">
          {selectedCategory}
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        {shuffledData.map((e, _i) => (
          <CardResult data={e} key={_i} />
        ))}
      </div>
      <Pagination limit={10} page={page} total={20} setPage={setPage} />
    </div>
  );
};

export default ResultDetail;
