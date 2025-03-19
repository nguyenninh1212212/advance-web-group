import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../util/pagebar/page";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardResult from "../../components/card/CardResult";

const ResultDetail = () => {
  const { name } = useParams();
  useEffect(() => window.scrollTo(0, 0), []);

  // Random danh sách truyện
  const shuffledData = [...fakedatadetail]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
          onClick={() => navigate(-1)} // Quay lại trang trước
        >
          ← Quay lại
        </button>
        <h1 className="text-4xl font-bold border-b w-fit">{name}</h1>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        {shuffledData.map((e, _i) => (
          <CardResult data={e} key={_i} />
        ))}
      </div>
      <Pagination
        limit={10}
        page={1}
        total={0}
        setPage={function (value: React.SetStateAction<number>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default ResultDetail;
