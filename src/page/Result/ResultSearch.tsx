import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { category } from "../../util/category";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import CardResult from "../../components/card/CardResult";
import Pagination from "../../util/pagebar/page";

const filters = [
  {
    name: "sortBy",
    label: "Sort by",
    options: [
      { name: "bestMatch", value: "Best Match" },
      { name: "newest", value: "Newest" },
      { name: "mostPopular", value: "Most Popular" },
    ],
    selectedOption: "bestMatch",
  },
  {
    name: "filterTags",
    label: "Filter tags",
    options: category,
    selectedOption: "fanColored",
  },
  {
    name: "contentRating",
    label: "Content Rating",
    options: [
      { name: "all", value: "All" },
      { name: "safe", value: "Safe" },
      { name: "suggestive", value: "Suggestive" },
      { name: "explicit", value: "Explicit" },
    ],
    selectedOption: "suggestive",
  },
  {
    name: "magazineDemographic",
    label: "Magazine Demographic",
    options: [
      { name: "any", value: "Any" },
      { name: "shounen", value: "Shounen" },
      { name: "shoujo", value: "Shoujo" },
      { name: "seinen", value: "Seinen" },
      { name: "josei", value: "Josei" },
    ],
    selectedOption: "any",
  },
  {
    name: "authors",
    label: "Authors",
    options: [], // Không có options vì đây là input
    selectedOption: "",
  },
  {
    name: "publicationStatus",
    label: "Publication Status",
    options: [
      { name: "ongoing", value: "Ongoing" },
      { name: "completed", value: "Completed" },
      { name: "hiatus", value: "Hiatus" },
      { name: "cancelled", value: "Cancelled" },
    ],
    selectedOption: "completed",
  },
];

const ResultSearch = () => {
  const [filtersVisible, setFiltersVisible] = useState(true);

  const [page, setPage] = useState<number>(1);

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
            />
            <FaTimes className="text-gray-400 cursor-pointer" />
          </div>
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="bg-purple-600 p-2 rounded flex items-center text-sm gap-2"
          >
            Filter
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
            {filters.map((filter, index) => (
              <div key={index}>
                <label className="block text-gray-400">{filter.label}</label>

                {filter.name === "authors" ? (
                  <input
                    type="text"
                    className="bg-gray-600 p-2 rounded w-full mt-2"
                    placeholder="Enter author name"
                  />
                ) : (
                  <select className="bg-gray-600 p-2 rounded w-full mt-2">
                    {filter.options.map((option, idx) =>
                      option.name != "Home" ? (
                        <option key={idx} value={option.name}>
                          {option.value}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-col items-center gap-2 mt-6 w-full ">
        <div className="grid grid-cols-3 gap-2 w-full">
          {fakedatadetail.slice(0, 5).map((e, _i) => (
            <CardResult data={e} key={_i} />
          ))}
        </div>
        <Pagination page={page} limit={6} total={29} setPage={setPage} />
      </section>
    </div>
  );
};

export default ResultSearch;
