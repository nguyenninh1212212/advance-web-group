import { useQuery } from "@tanstack/react-query";
import CardResult from "../../components/card/CardResult";
import CardTitle from "../../components/card/CardTitle";
import Pagination from "../../util/pagebar/page";
import { getfavorites } from "../../api/favorites";
import { useState } from "react";

const Favorite = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getfavorites(),
  });
  console.log("🚀 ~ Favorite ~ error:", error);
  console.log("🚀 ~ Favorite ~ isLoading:", isLoading);

  const [pagr, setPage] = useState<number>(0);
  console.log("🚀 ~ Favorite ~ data?.pageable.:", data?.pageable.pageSize);

  return (
    <div className="flex flex-col gap-4 py-2 ">
      <div className="flex w-screen ">
        <CardTitle title={"Yêu thich"} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* {fakedatadetail.slice(0, 5).map((item) => (
          <CardResult data={item} />
        ))} */}
        {data?.content?.map((item: any) => (
          <CardResult data={item} />
        ))}
      </div>
      <Pagination
        initialPage={data?.result?.page + 1}
        totalPage={data?.result?.total}
        onPageChange={(newPage: number) => setPage(newPage - 1)}
      />
    </div>
  );
};

export default Favorite;
