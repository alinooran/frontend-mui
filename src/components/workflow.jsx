import { Pagination, PaginationItem, Table, TableBody, TableContainer, TableFooter, TableHead } from "@mui/material";
import { Td, Th, Tr } from "./custom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import moment from "jalali-moment";
import MyPagination from "./pagination";
const Workflow = ({ id }) => {
  const [workflows, setWorkflows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 15;

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const res = await api.get(`/request/${id}/workflow`);
      res.data.data.forEach((w) => {
        const m = moment(w.CreatedAt);
        m.locale("fa");
        w.created_at = m.format("HH:mm - YYYY/MM/DD");
      });
      setWorkflows(res.data.data);
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
            <Th>تاریخ ارسال</Th>
            <Th>اقدام کننده</Th>
            <Th>مرحله</Th>
            <Th>وضعیت</Th>
            <Th>توضیحات</Th>
          </Tr>
        </TableHead>
        <TableBody>
          {workflows.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((w) => {
            return (
              <Tr key={w.ID}>
                <Td>{w.created_at}</Td>
                <Td>{w.sender_name}</Td>
                <Td>{w.step}</Td>
                <Td>
                  {w.status === true ? "تایید" : w.status === false ? "رد" : ""}
                </Td>
                <Td>{w.description}</Td>
              </Tr>
            );
          })}
        </TableBody>
        <TableFooter>
          <Tr>
            <Td colSpan={5}>
            <MyPagination pageCount={Math.ceil(workflows.length / itemPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange} />
            </Td>
          </Tr>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Workflow;
