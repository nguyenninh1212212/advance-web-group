import React, { useState, useEffect } from "react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  setPage,
  setLimit,
}) => {
  const totalPage = Math.ceil(total / limit);
  const [inputPage, setInputPage] = useState(page);
  const [inputLimit, setInputLimit] = useState(limit);

  useEffect(() => {
    if (inputPage >= 1 && inputPage <= totalPage) {
      setPage(inputPage);
    }
  }, [inputPage]);

  useEffect(() => {
    if (inputLimit > 0) {
      setLimit(inputLimit);
      setPage(1);
    }
  }, [inputLimit]);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
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
    <div className="flex max-md:flex-col items-center justify-center bg-primary-400 w-full max-w-2xl mx-auto rounded-lg p-3 my-4 space-y-3 md:space-y-0 md:justify-between">
      {/* Items per page */}
      <div className="flex items-center space-x-2">
        <label className="text-white">Items:</label>
        <input
          type="number"
          value={inputLimit}
          onChange={(e) => setInputLimit(Number(e.target.value))}
          className="w-16 px-2 rounded border border-gray-300 text-black"
        />
      </div>

      {/* Page navigation */}
      <div className="flex items-center justify-center flex-wrap space-x-1">
        {pages.map((p, index) => (
          <button
            key={index}
            onClick={() => typeof p === "number" && handleClick(p)}
            className={`px-3 py-1 rounded transition-all ${
              p === page
                ? "bg-white text-primary-400 font-bold"
                : "bg-primary-500 text-white"
            }`}
            disabled={p === "..."}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Page input */}
      <div className="flex items-center space-x-2">
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
