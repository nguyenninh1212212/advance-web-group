import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import Pagination from "../../util/pagebar/page";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/category";
import ClipLoader from "react-spinners/ClipLoader";
import { filterStory } from "../../api/stories";
import { useToast } from "../../util/ToastContext";
import { IStory } from "../../type/comic";
import CardResult from "../../components/card/CardResult";

const ResultSearch = () => {
  const { showToast } = useToast();

  const [filterFields, setFilterFields] = useState(
    new Map([
      ["keyword", ""],
      ["category", ""],
      ["author", ""],
      ["status", ""],
      ["type", ""],
    ])
  );

  const [appliedFilters, setAppliedFilters] = useState(new Map(filterFields));
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filtersVisible, setFiltersVisible] = useState(true);

  // Lấy danh mục từ API
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  // Lọc dữ liệu từ API
  const {
    data: dataFilter,
    isLoading: isLoadingFilter,
    error: errorFilter,
  } = useQuery({
    queryKey: ["filter", Array.from(appliedFilters.entries()), page, limit],
    queryFn: () => filterStory(appliedFilters, page, limit),
  });

  const filters = [
    {
      name: "category",
      label: "Thể loại",
      options: categoryData?.categories || [],
    },
    {
      name: "type",
      label: "Kiểu truyện",
      options: [
        { name: "Comic", id: "COMIC" },
        { name: "Novel", id: "NOVEL" },
      ],
    },
    {
      name: "author",
      label: "Tác giả",
      isText: true,
    },
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { name: "Updating", id: "UPDATING" },
        { name: "Completed", id: "COMPLETED" },
        { name: "Coming soon", id: "COMING_SOON" },
      ],
    },
  ];

  const handleFilterChange = (name: string, value: string) => {
    setFilterFields((prev) => new Map(prev).set(name, value));
  };

  const clearKeyword = () => {
    setFilterFields((prev) => new Map(prev).set("keyword", ""));
  };

  const handleSubmitFilters = () => {
    showToast("Đã áp dụng bộ lọc");
    setAppliedFilters(new Map(filterFields));
    setPage(0); // Reset về trang đầu tiên
  };

  // if (error || errorFilter) {
  //   return <div>Error: {error?.message || errorFilter?.message}</div>;
  // }

  if (isLoading || isLoadingFilter) {
    return (
      <div>
        <ClipLoader
          color={"gray"}
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={true}
          size={50}
        />
      </div>
    );
  }

  return (
    <div className="text-white rounded-lg w-full mx-auto flex flex-col">
      {/* Search Input */}
      <section>
        <div className="flex h-12 gap-2">
          <div className="flex items-center gap-2 w-full bg-gray-600 p-3 rounded-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-white"
              value={filterFields.get("keyword")}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
            {filterFields.get("keyword") && (
              <FaTimes
                className="text-gray-400 cursor-pointer"
                onClick={clearKeyword}
              />
            )}
          </div>
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="bg-purple-600 p-2 rounded flex items-center text-sm gap-2"
          >
            {filtersVisible ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            <IoIosArrowUp
              className={`transition-transform font-bold ${
                filtersVisible ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Filters Section */}
        {filtersVisible && (
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            {filters.map((filter) => (
              <div key={filter.name}>
                <label>{filter.label}</label>
                {filter.isText ? (
                  <input
                    type="text"
                    className="bg-gray-600 p-2 rounded w-full mt-2"
                    placeholder={`Nhập ${filter.label.toLowerCase()}`}
                    value={filterFields.get(filter.name)}
                    onChange={(e) =>
                      handleFilterChange(filter.name, e.target.value)
                    }
                  />
                ) : (
                  <select
                    className="bg-gray-600 p-2 rounded w-full mt-2"
                    value={filterFields.get(filter.name) || ""}
                    onChange={(e) =>
                      handleFilterChange(filter.name, e.target.value)
                    }
                  >
                    <option value="">Tất cả</option>
                    {filter.options.map(
                      (option: { name: string; id: string }) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        <div className="mt-4 flex ">
          <button
            onClick={handleSubmitFilters}
            className="bg-purple-600 p-2 rounded text-white"
          >
            Gửi bộ lọc
          </button>
        </div>
      </section>

      {/* Pagination + Kết quả */}
      <section className="flex flex-col items-center gap-2 mt-6 w-full">
        <div className="grid grid-cols-2 gap-2 w-full">
          {dataFilter?.result?.data?.map((story: IStory) => (
            <CardResult data={story} key={story.id} />
          ))}
        </div>
        <Pagination
          initialLimit={limit}
          initialPage={page}
          totalItem={dataFilter?.result?.totalItems || 0}
        />
      </section>
    </div>
  );
};

export default ResultSearch;
