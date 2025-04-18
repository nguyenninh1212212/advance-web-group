
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardResult from "../../components/card/CardResult";
import CardTitle from "../../components/card/CardTitle";
import Pagination from "../../util/pagebar/page";

const Favorite = () => {
  return (
    <div className="flex flex-col gap-4 py-2 ">
      <div className="flex w-screen ">
        <CardTitle title={"Yêu thich"} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {fakedatadetail.slice(0, 5).map((item) => (
          <CardResult data={item} />
        ))}
      </div>
      <Pagination initialPage={1} initialLimit={10} totalItem={100} />
    </div>
  );
};

export default Favorite;
