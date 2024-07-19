import { Pagination, PaginationItem, Table, TableBody, TableContainer, TableFooter, TableHead } from "@mui/material";
import { Td, Th, Tr } from "./custom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import axios from "axios";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const RequestGuest = ({ id }) => {
  const [guests, setGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 15;

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await api.get(`/request/${id}/guest`);
      setGuests(res.data.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer
      sx={{ width: "100%", overflowX: "auto", maxHeight: "100%" }}
    >
      <Table
        sx={{
          margin: "0.5em 0",
          minWidth: "900px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TableHead>
          <Tr>
            <Th>ردیف</Th>
            <Th>نام</Th>
            <Th>نام خانوادگی</Th>
            <Th>کد ملی</Th>
            <Th>بازه زمانی</Th>
          </Tr>
        </TableHead>
        <TableBody>
          {guests
            .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
            .map((g, i) => {
              return (
                <Tr key={i}>
                  <Td>{(currentPage - 1) * itemPerPage + i + 1}</Td>
                  <Td>{g.first_name}</Td>
                  <Td>{g.last_name}</Td>
                  <Td>{g.national_code}</Td>
                  <Td>{g.end_time + " - " + g.start_time}</Td>
                </Tr>
              );
            })}
        </TableBody>
        <TableFooter>
          <Tr>
            <Td colSpan={5}>
              <Pagination
                size="small"
                color="secondary"
                count={Math.ceil(guests.length / itemPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowForwardIos, next: ArrowBackIos }}
                    {...item}
                  />
                )}
              />
            </Td>
          </Tr>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default RequestGuest;
