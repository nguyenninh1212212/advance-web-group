import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/my";
import ClipLoader from "react-spinners/ClipLoader";
import { getMyList } from "../../api/stories";
import { IStory } from "../../type/comic";
import CardComicDetail from "../../components/card/CardComicDetail";
import { FaMoneyBill } from "react-icons/fa";

export const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
  console.log("🚀 ~ Profile ~ data:", data);
  const {
    data: st,
    isLoading: loading,
    error: err,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => getMyList(),
  });

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (error || err) {
    return <div className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu</div>;
  }

  return (
    <div className=" ">
      {/* Banner */}
      <div
        className="absolute top-14 left-0 right-0 h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/08/50/30/01/360_F_850300178_2R0d9z8EiG6hN8Yj5QaBEYJAEVFflJly.jpg')`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 z-10 mt-16 flex flex-wrap">
        {/* Avatar + Info */}
        <div className="flex items-center space-x-6 z-10">
          <img
            src={
              data.result.imageUrl ||
              "https://media.tenor.com/7JTQjJOqlfQAAAAM/cats-cat-animation.gif"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-800 bg-white z-10"
          />
          <div className="z-10 bg-black/50 backdrop-blur-md p-4 rounded-lg shadow-md text-white">
            <h1 className="text-3xl font-bold">{data.result.fullName}</h1>
            <p className="text-sm text-gray-400">{data.result.dateOfBirth}</p>
            <p className="text-sm text-gray-400">{data.result.email}</p>
            <p className="text-xl text-green-500 flex items-center gap-2">
              {data.result.balance} <FaMoneyBill />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 px-4 max-w-5xl mx-auto mb-2">
        <h2 className="text-xl font-semibold mb-4">Danh sách truyện của bạn</h2>
        <div className="grid flex sm:grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
          {st?.data.map((item: IStory) => (
            <CardComicDetail key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
