import React from "react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  setPage,
}) => {
  const totalPage = Math.ceil(total / limit);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
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
    <div className="flex items-center justify-center bg-primary-400 p-1 w-1/2 rounded-lg my-4 self-center">
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
  );
};

export default Pagination;
