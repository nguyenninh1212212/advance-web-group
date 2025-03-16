import CardComichorizontal from "../../components/card/CardComichorizontal";
import { groupDataIntoFour } from "../../util/group/groupdata";
import { fakedatadetail } from "../../FakeData/FakedataDetail";

const ComicLastest = () => {
  //Xử lý logic sau
  const groupdata = groupDataIntoFour(fakedatadetail, 4);
  return (
    <div className="flex overflow-hidden gap-3 justify-between mb-3 mt-2">
      {groupdata.map((group, _i) => (
        <div className=" w-auto h-[500px] bg-gray-400 p-2" key={_i}>
          {group.map((e) => (
            <div className="py-1">
              <CardComichorizontal data={e} message={""} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComicLastest;
