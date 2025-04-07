import { useState } from "react";

const usePagination = (
  initialPage: number,
  initialLimit: number,
  totalItem: number
) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPage = Math.ceil(totalItem / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return { page, limit, totalPage, handlePageChange, handleLimitChange };
};

export default usePagination;
