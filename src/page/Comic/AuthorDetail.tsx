import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStoryOfAuthor } from "../../api/stories";
import CardTitle from "../../components/card/CardTitle";
import ComicContainer from "./ComicContainer";

const AuthorDetail: React.FC = () => {
  const { id } = useParams<string>();

  // Fetch thông tin tác giả và danh sách truyện của tác giả
  const { data, isLoading, error } = useQuery({
    queryKey: ["authorDetail", id],
    queryFn: () => getStoryOfAuthor(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="text-center text-gray-400">No data found.</div>;
  }

  return (
    <div className="flex flex-col gap-3 ">
      <div>
        <CardTitle title="Truyện của tác giả" />
        <ComicContainer data={data} />
      </div>
    </div>
  );
};

export default AuthorDetail;
