import CardHistory from "../../components/card/CardHistory";
import CardTitle from "../../components/card/CardTitle";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../api/stories";
import Loading from "../../util/useLoading";
import { Icard } from "../../type/comic";

const History = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(),
  });
  console.log("🚀 ~ History ~ error:", error);

  if (isLoading) {
    Loading(isLoading);
  }

  console.log(
    "🚀 ~ History ~ data?.result.data?.result?.data:",
    data?.result.data
  );
  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <CardTitle title="Lịch sử xem" />
      </div>
      {data?.result.data?.map((e: Icard) => (
        <CardHistory data={e} />
      ))}
    </div>
  );
};

export default History;
