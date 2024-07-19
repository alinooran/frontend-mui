import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Pagination, PaginationItem } from "@mui/material";

const MyPagination = ({pageCount, onPageChange, currentPage}) => {
  return (
    <Pagination
      size="small"
      color="secondary"
      count={pageCount}
      page={currentPage}
      onChange={onPageChange}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: ArrowForwardIos,
            next: ArrowBackIos,
          }}
          {...item}
        />
      )}
    />
  );
};

export default MyPagination;
