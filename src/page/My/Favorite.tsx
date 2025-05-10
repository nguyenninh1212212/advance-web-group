import { useQuery } from "@tanstack/react-query";
import CardResult from "../../components/card/CardResult";
import CardTitle from "../../components/card/CardTitle";
import { getfavorites } from "../../api/favorites";
import { IStory } from "../../type/comic";

const Favorite = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getfavorites(),
  });
  console.log("🚀 ~ Favorite ~ error:", error);
  console.log("🚀 ~ Favorite ~ isLoading:", isLoading);

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
        {data?.content?.map((item: IStory) => (
          <CardResult data={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
