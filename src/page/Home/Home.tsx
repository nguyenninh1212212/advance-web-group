import Comic from "../Comic//Comic";
import ComicLastest from "../Comic/ComicLastest";
import ComicNew from "../Comic/ComicNew";

const Home = () => {
  return (
    <>
      <p className="py-2 px-3  w-56 mb-3 text-black rounded-sm bg-primary-300 text-center">
        Truyện mới cập nhật
      </p>
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
