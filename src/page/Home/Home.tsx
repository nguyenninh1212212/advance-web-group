import { useSelector } from "react-redux";
import CardTitle from "../../components/card/CardTitle";
import Comic from "../Comic/Comic";
import ComicLastest from "../Comic/ComicLastest";
import ComicNew from "../Comic/ComicNew";
import { RootState } from "../../redux/store";
import { category } from "../../util/category";
import Result from "../Result/Result";

const Home = () => {
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const key: string =
    category.find((e) => e.name == selectedCategory)?.name || "";

  const HomePage = () => {
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

  return <div>{key == category[0].name ? HomePage() : <Result />}</div>;
};

export default Home;
