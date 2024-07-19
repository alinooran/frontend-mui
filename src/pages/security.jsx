import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Td, Th, Tr } from "../components/custom";
import Input from "../components/input";
import MyPagination from "../components/pagination";
import usePagination from "../customHooks/usePagination";
import moment from "jalali-moment";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";

const Container = styled(Stack)(({ theme }) => ({
  width: "80%",
  maxWidth: "1200px",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "0 1rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "700",
  margin: "1rem 0",
}));

const Date = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "700",
}));

const FilterContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  marginTop: "2rem",
  marginBottom: "0.5rem",
}));

const Security = () => {
  const { context, setContext } = useContext(AppContext);
  const navigate = useNavigate();
  const itemPerPage = 30;
  const [currentPage, setCurrentPage, handlePageChange] = usePagination();
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchGuests();
    setTodayDate();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setContext({ ...context, profile: res.data });
      if (res.data.role === "security") {
        navigate("/security");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
      navigate("/login");
    }
  };

  const fetchGuests = async () => {
    try {
      const res = await api.get("/guest");
      setGuests(res.data.data);
      setFilteredGuests(res.data.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  const setTodayDate = () => {
    const m = moment();
    m.locale("fa");
    setDate(m.format("YYYY/MM/DD"));
  };

  const handleFilterByNationalID = (e) => {
    const query = e.target.value;
    let updatedList = [...guests];
    updatedList = updatedList.filter((g) => {
      return g.national_code.indexOf(query) !== -1;
    });
    setFilteredGuests(updatedList);
    setCurrentPage(1);
  };

  const handleRecordEntry = async (id, idx) => {
    try {
      await api.post(`/guest/${id}`);
      const newGuests = [...guests];
      newGuests[idx].is_entered = true;
      setGuests(newGuests);
      setFilteredGuests(newGuests);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  return (
    <Stack alignItems="center">
      <Navbar />
      <Container>
        <Title>مهمان های امروز</Title>
        <Date>{date}</Date>
        <FilterContainer>
          <Input
            type="text"
            width="220px"
            placeholder="جستجوی کد ملی"
            containerSx={{ margin: "0" }}
            onChange={handleFilterByNationalID}
            inputSx={{ borderRadius: "0", padding: "4px 6px" }}
          />
        </FilterContainer>
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ width: "100%", minWidth: "900px" }}>
            <TableHead>
              <Tr>
                <Th>ردیف</Th>
                <Th>نام</Th>
                <Th>نام خانوادگی</Th>
                <Th>کد ملی</Th>
                <Th>بازه زمانی</Th>
                <Th></Th>
              </Tr>
            </TableHead>
            <TableBody>
              {guests.length === 0 && (
                <Tr>
                  <Th colSpan={6}>مهمانی وجود ندارد</Th>
                </Tr>
              )}
              {filteredGuests
                .slice(
                  (currentPage - 1) * itemPerPage,
                  currentPage * itemPerPage
                )
                .map((g, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{(currentPage - 1) * itemPerPage + i + 1}</Td>
                      <Td>{g.first_name}</Td>
                      <Td>{g.last_name}</Td>
                      <Td>{g.national_code}</Td>
                      <Td>{g.end_time + " - " + g.start_time}</Td>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          padding: "0.4rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        <Button
                          disabled={g.is_entered}
                          color="success"
                          variant="outlined"
                          sx={{ padding: "2px" }}
                          onClick={() => handleRecordEntry(g.ID, i)}
                        >
                          ثبت ورود
                        </Button>
                      </TableCell>
                    </Tr>
                  );
                })}
            </TableBody>
            <TableFooter>
              <Tr>
                <Td colSpan={6}>
                  <MyPagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageCount={Math.ceil(guests.length / itemPerPage)}
                  />
                </Td>
              </Tr>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Stack>
  );
};

export default Security;
