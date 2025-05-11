import CardComicDetail from "../../components/card/CardComicDetail";
import CardTitle from "../../components/card/CardTitle";
import { IStoriesResponse } from "../../type/comic";

interface IPayload {
  data: IStoriesResponse;
}

const ComicNew: React.FC<IPayload> = ({ data }) => {
  return (
    <>
      <div className="flex justify-between items-center mt-2 relative ">
        <CardTitle title="Truyện mới" />

        <div className="flex"> {/* Dropdown menu */}</div>
      </div>

      {/* Comic list */}
      <div className="w-full h-auto  rounded-lg grid md:grid-cols-5  gap-4 pt-4 grid-cols-2">
        {data?.data.map((e, _i) => (
          <div key={_i} className="snap-start flex justify-center items-center">
            <CardComicDetail data={e} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ComicNew;
