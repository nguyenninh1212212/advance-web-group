import CardCategory from "../../components/card/CardCategory";
import CardTitle from "../../components/card/CardTitle";
import { category } from "../../util/category";
import Comic from "../Comic//Comic";
import ComicLastest from "../Comic/ComicLastest";
import ComicNew from "../Comic/ComicNew";

const Home = () => {
  return (
    <>
      <div className="my-4 flex gap-2">
        {category.map((e, _i) => (
          <CardCategory name={e.name} key={_i} />
        ))}
      </div>
      <CardTitle title={"Truyện mới cập nhật"} />
      <ComicLastest />
      <div className="text-black flex w-full gap-3 h-full flex-col ">
        <div className="w-full flex-col flex gap-2">
          <div>
            <Comic />
          </div>

          <div>
            <ComicNew />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
