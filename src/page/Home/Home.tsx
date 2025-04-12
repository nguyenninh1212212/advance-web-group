import { useSelector } from "react-redux";
import CardTitle from "../../components/card/CardTitle";
import Comic from "../Comic/Comic";
import ComicLastest from "../Comic/ComicLastest";
import ComicNew from "../Comic/ComicNew";
import { RootState } from "../../redux/store";
import ResultDetail from "../Result/ResultDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../api/stories";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["home"],
    queryFn: () => getStories(0, 10),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("🚀 ~ HomePage ~ data:", data);

  return (
    <>
      <CardTitle title={"Truyện mới cập nhật"} />
      <ComicLastest />
      <div className="text-black flex w-full gap-3 h-full flex-col ">
        <div className="w-full flex-col flex gap-2">
          <Comic />
          <ComicNew />
        </div>
      </div>
    </>
  );
};

const Home = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  return (
    <div>
      {selectedCategory === "Home" ? (
        <HomePage />
      ) : (
        <ResultDetail data={fakedatadetail} />
      )}
    </div>
  );
};

export default Home;
