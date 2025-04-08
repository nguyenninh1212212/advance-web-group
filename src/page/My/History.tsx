import React from "react";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardHistory from "../../components/card/CardHistory";
import CardTitle from "../../components/card/CardTitle";

const History = () => {
  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <CardTitle title="Lịch sử xem" />
      </div>
      {fakedatadetail.slice(0, 3).map((e) => (
        <CardHistory data={e} />
      ))}
    </div>
  );
};

export default History;
