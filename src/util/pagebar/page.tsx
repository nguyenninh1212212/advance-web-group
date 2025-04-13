import React, { useState, useEffect } from "react";
import usePagination from "./pageHook";
import { useTheme } from "../theme/theme";

interface PaginationProps {
  initialPage: number;
  initialLimit: number;
  totalItem: number;
}

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
  initialLimit,
  totalItem,
}) => {
  const { page, totalPage, handlePageChange } = usePagination(
    initialPage,
    initialLimit,
    totalItem
  );

  const theme = useTheme();

  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    if (inputPage >= 1 && inputPage <= totalPage) {
      handlePageChange(inputPage);
    }
  }, [inputPage]);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      handlePageChange(newPage);
      setInputPage(newPage);
    }
  };

  let pages: (number | string)[] = [];
  if (totalPage <= 5) {
    pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  } else {
    pages = [1];
    if (page > 3) pages.push("...");
    const middlePages = Array.from(
      { length: totalPage },
      (_, i) => i + 1
    ).filter((p) => p >= page - 1 && p <= page + 1 && p > 1 && p < totalPage);
    pages.push(...middlePages);
    if (page < totalPage - 2) pages.push("...");
    pages.push(totalPage);
  }

  return (
    <div
      className={`flex max-md:flex-col items-center justify-center ${theme.background_card} w-full max-w-2xl mx-auto rounded-lg p-3 my-4 space-y-3 md:space-y-0 md:justify-between`}
    >
      {/* Page navigation */}
      <div className="w-1/4"></div>
      <div className="flex items-center justify-center flex-wrap space-x-1 w-1/2">
        {pages.map((p, index) => (
          <button
            key={index}
            onClick={() => typeof p === "number" && handleClick(p)}
            className={`px-3 py-1 rounded transition-all ${
              p === page
                ? `text-black bg-white  font-bold`
                : "bg-primary-500 text-white"
            }`}
            disabled={p === "..."}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Page input */}
      <div className="flex items-center space-x-2 w-1/4">
        <label className="text-white">Page:</label>
        <input
          type="number"
          value={inputPage}
          onChange={(e) => {
            const newPage = Math.min(
              Math.max(Number(e.target.value), 1),
              totalPage
            );
            setInputPage(newPage);
          }}
          className="w-16 px-2 rounded border border-gray-300 text-black"
        />
      </div>
    </div>
  );
};

export default Pagination;
