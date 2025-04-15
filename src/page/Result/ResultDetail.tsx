import React, { useEffect } from "react";
import Pagination from "../../util/pagebar/page";
import CardResult from "../../components/card/CardResult";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IStory } from "../../type/comic";
import { useQuery } from "@tanstack/react-query";
import { getStoriesByCate } from "../../api/stories";
import ClipLoader from "react-spinners/ClipLoader";

const ResultDetail = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  );
  const selectedCategoryName = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["cateStory", selectedCategory],
    queryFn: () => getStoriesByCate(selectedCategory, 0, 10),
  });

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

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold border-b w-fit">
          {selectedCategoryName}
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        {data?.data.length == 0 ? (
          <p>No stories</p>
        ) : (
          data?.data.map((e: IStory) => <CardResult data={e} key={e.id} />)
        )}
      </div>
      <Pagination initialLimit={10} initialPage={1} totalItem={10} />
    </div>
  );
};

export default ResultDetail;
