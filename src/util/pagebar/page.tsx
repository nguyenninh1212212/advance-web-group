import React, { useState, useEffect } from "react";
import { useTheme } from "../theme/theme";

interface PaginationProps {
  initialPage: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
  totalPage,
  onPageChange,
}) => {
  const theme = useTheme();

  const [page, setPage] = useState(initialPage);
  const [inputPage, setInputPage] = useState(initialPage);
  
  useEffect(() => {
    if (inputPage >= 1 && inputPage <= totalPage) {
      setPage(inputPage);
      onPageChange(inputPage); // gọi callback khi nhập số trang
    }
  }, [inputPage, totalPage]);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
      setInputPage(newPage);
      onPageChange(newPage); // gọi callback
    }
  };

  // Generate list of all pages from 1 to totalPage
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div
      className={`flex max-md:flex-col items-center justify-center ${theme.background_card} w-full max-w-2xl mx-auto rounded-lg p-3 my-4 space-y-3 md:space-y-0 md:justify-between`}
    >
      {/* Page navigation */}
      <div className="w-1/4"></div>
      <div className="flex items-center justify-center flex-wrap space-x-1 w-1/2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handleClick(p)}
            className={`px-3 py-1 rounded transition-all ${
              p === page
                ? `text-black bg-white font-bold`
                : "bg-primary-500 text-white"
            }`}
            disabled={p === page}
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
