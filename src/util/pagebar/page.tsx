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
  }, [inputPage]); // Tự động cập nhật trang khi nhập số

  useEffect(() => {
    if (inputLimit > 0) {
      setLimit(inputLimit);
      setPage(1); // Reset về trang đầu khi đổi limit
    }
  }, [inputLimit]); // Tự động cập nhật limit khi nhập số

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

    if (page > 3) {
      pages.push("...");
    }

    const middlePages = Array.from(
      { length: totalPage },
      (_, i) => i + 1
    ).filter((p) => p >= page - 1 && p <= page + 1 && p > 1 && p < totalPage);

    pages.push(...middlePages);

    if (page < totalPage - 2) {
      pages.push("...");
    }

    pages.push(totalPage);
  }

  return (
    <div className="flex flex-row items-center justify-around bg-primary-400  w-3/4 rounded-lg p-3 my-4 self-center">
      <div className="flex items-center space-x-2 ">
        <label className="text-white">Items:</label>
        <input
          type="number"
          value={inputLimit}
          onChange={(e) => setInputLimit(Number(e.target.value))}
          className="w-16 px-2  rounded border border-gray-300 text-black"
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        {pages.map((p, index) => (
          <button
            key={index}
            onClick={() => typeof p === "number" && handleClick(p)}
            className={`px-3 py-1 mx-1 rounded ${
              p === page
                ? "bg-white text-primary-400 font-bold"
                : "bg-primary-400 text-white"
            }`}
            disabled={p === "..."}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2 ">
        <label className="text-white">Go to page:</label>
        <input
          type="number"
          value={inputPage}
          onChange={(e) => {
            const newPage = Math.min(
              Math.max(Number(e.target.value), 1),
              totalPage
            ); // Giới hạn từ 1 đến totalPage
            setInputPage(newPage);
          }}
          className="w-16 px-2 rounded border border-gray-300 text-black"
        />
      </div>
    </div>
  );
};

export default Pagination;
