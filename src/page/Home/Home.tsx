import { useSelector } from "react-redux";
import CardTitle from "../../components/card/CardTitle";
import Comic from "../Comic/Comic";
import ComicLastest from "../Comic/ComicLastest";
import ComicNew from "../Comic/ComicNew";
import { RootState } from "../../redux/store";
import ResultDetail from "../Result/ResultDetail";
import { useQuery } from "@tanstack/react-query";
import { getHomepage } from "../../api/stories";
import CardCategory from "../../components/card/CardCategory";
import { useMemo, useState } from "react";
import Popup from "../../components/popup/Popup";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IStoriesResponse, IStory } from "../../type/comic";
import { useIsMobile } from "./../../util/Mobile";
import ClipLoader from "react-spinners/ClipLoader";

interface IHomepagePayload {
  getStoriesComingSoon: IStoriesResponse;
  getStoriesRank: IStory[];
  getStoriesRecommend: IStoriesResponse;
  getStoriesUpdating: IStoriesResponse;
  getStories: IStoriesResponse;
}

const HomePage: React.FC<IHomepagePayload> = ({
  getStories,
  getStoriesComingSoon,
  getStoriesRank,
  getStoriesRecommend,
  getStoriesUpdating,
}) => {
  return (
    <>
      <CardTitle title={"Truyện mới cập nhật"} />
      <ComicLastest data={getStoriesUpdating} />
      <div className="text-black flex w-full gap-3 h-full flex-col ">
        <div className="w-full flex-col flex gap-2">
          <Comic
            Comming={getStoriesComingSoon}
            Recommend={getStoriesRecommend}
            Rank={getStoriesRank}
          />
          {/* <ComicNew data={getStories} /> */}
        </div>
        <ComicNew data={getStories} />
      </div>
    </>
  );
};

const Home = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["home"],
    queryFn: () => getHomepage(),
  });
  const category = useMemo(() => data?.categories?.categories || [], [data]);

  if (isLoading)
    return (
      <div>
        {" "}
        <ClipLoader
          color={"gray"}
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const categoriesToShow = isMobile ? category.slice(0, 6) : category;
  const isMoreCate = category
    .slice(0, 6)
    .find(
      (e: { name: string }) =>
        e.name === selectedCategory ||
        selectedCategory === "Home" ||
        selectedCategory == "All"
    )
    ? false
    : true;
  return (
    <div className="pb-10">
      <div className="pb-4 flex flex-wrap gap-2 w-full h-auto">
        {[
          { name: "Home", value: "Home" },
          { name: "All", value: "all" },
        ].map((e, index) => (
          <CardCategory key={index} name={e.name} id={e.value} />
        ))}
        {categoriesToShow.map((e: { id: string; name: string }) => (
          <CardCategory key={e.id} name={e.name} id={e.id} />
        ))}

        {isMobile && category.length > 5 && (
          <button
            className={`${
              isMoreCate ? "bg-indigo-600" : "bg-gray-600"
            } text-gray-300 py-1 px-3 rounded-2xl inline-block `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdOutlineMoreHoriz />
          </button>
        )}
      </div>
      {selectedCategory === "Home" ? (
        <HomePage
          getStories={data?.stories}
          getStoriesComingSoon={data?.getStoriesComingSoon}
          getStoriesRank={data?.getStoriesRank}
          getStoriesRecommend={data?.getStoriesRecommend}
          getStoriesUpdating={data?.getStoriesUpdating}
        />
      ) : (
        <ResultDetail />
      )}
      {isMobile && isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          backgroundColor="bg-gray-800"
        >
          <div className="gap-2 flex flex-wrap w-full h-auto">
            {category.map((e: { id: string; name: string }) => (
              <CardCategory key={e.id} name={e.name} id={e.id} />
            ))}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Home;
