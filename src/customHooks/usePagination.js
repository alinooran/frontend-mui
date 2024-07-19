import { useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return [currentPage, setCurrentPage, handlePageChange];
};

export default usePagination;