import {
  Button,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  Typography,
} from "@mui/material";
import Container from "../components/common/container";
import styled from "@emotion/styled";
import Input from "../components/input";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { Search } from "@mui/icons-material";
import { Td, Th, Tr } from "../components/custom";
import MyPagination from "../components/pagination";
import usePagination from "../customHooks/usePagination";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_calendar from "react-date-object/calendars/gregorian";
import * as yup from "yup";

const FilterBox = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: "1em",
  // padding: "1em",
  // borderRadius: "0px",
  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px"
}));

const InputsContainer = styled(Stack)(({ theme }) => ({
  // border: "1px solid blue",
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "5%",
  [theme.breakpoints.down("s")]: {
    justifyContent: "center",
  },
  // justifyContent: "space-between",
}));

const Report = () => {
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [arrivalOptions, setArrivalOptions] = useState([]);
  const [guests, setGuests] = useState([]);
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [arrival, setArrival] = useState("");
  const [errors, setErrors] = useState({});
  const [host, setHost] = useState("");
  const [currentPage, setCurrentPage, handlePageChange] = usePagination();
  const itemPerPage = 30;

  useEffect(() => {
    setArrivalOptions([
      {
        value: "",
        title: "همه",
      },
      {
        value: true,
        title: "مراجعه کرده",
      },
      {
        value: false,
        title: "مراجعه نکرده",
      },
    ]);
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await api.get(`/department`);
      const deps = [
        {
          value: "",
          title: "همه",
        },
      ];
      res.data.data.forEach((e) => {
        deps.push({
          value: e.id,
          title: e.name,
        });
      });
      setDepartmentOptions(deps);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  const handleDate = (val) => {
    setDate({
      date_jalali: val.format(),
      date: val.convert(gregorian_calendar, gregorian_en).format(),
    });
  };

  const filterSchema = yup.object({
    date: yup
      .string()
      .matches(/\d{4}\/\d{2}\/\d{2}/, "فرمت تاریخ صحیح نیست")
      .required("این فیلد ضروری است"),
  });

  const handleSearch = async () => {
    setErrors({});
    try {
      await filterSchema.validate(
        { date: date.date },
        { abortEarly: false }
      );
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <FilterBox>
        <InputsContainer>
          <Input
            label={"تاریخ"}
            width="30%"
            containerSx={{ minWidth: "250px", margin: "8px 0" }}
            type={"date"}
            name={"date"}
            onChange={handleDate}
            value={date.date_jalali}
            error={errors.date}
          />
          <Input
            label={"نام بخش"}
            width="30%"
            containerSx={{ minWidth: "250px", margin: "8px 0" }}
            type={"select"}
            options={departmentOptions}
            name={"department"}
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
          />
          <Input
            label={"نام مهمان"}
            width="30%"
            containerSx={{ minWidth: "250px", margin: "8px 0" }}
            type={"text"}
            name={"guest_name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            label={"وضعیت مراجعه"}
            width="30%"
            containerSx={{ minWidth: "250px", margin: "8px 0" }}
            type={"select"}
            options={arrivalOptions}
            name={"arrival"}
            onChange={(e) => setArrival(e.target.value)}
            value={arrival}
          />
          <Input
            label={"نام میزبان"}
            width="30%"
            containerSx={{ minWidth: "250px", margin: "8px 0" }}
            type={"text"}
            name={"host_name"}
            onChange={(e) => setHost(e.target.value)}
            value={host}
          />
        </InputsContainer>
        <InputsContainer>
          <Button
            variant="contained"
            color="success"
            onClick={handleSearch}
            startIcon={<Search />}
            size="small"
            sx={{ width: "150px", margin: "8px 0", gap: 1 }}
          >
            <Typography variant="button" marginLeft={2}>
              جست و جو
            </Typography>
          </Button>
        </InputsContainer>
      </FilterBox>
      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: "750px" }}>
          <TableHead>
            <Tr>
              <Th>ردیف</Th>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>کد ملی</Th>
              <Th>ساعت ورود</Th>
              <Th>نام بخش</Th>
              <Th>میزبان</Th>
              <Th>وضعیت مراجعه</Th>
            </Tr>
          </TableHead>
          <TableBody>
            {guests.length === 0 && (
              <Tr>
                <Th colSpan={8}>مهمانی یافت نشد</Th>
              </Tr>
            )}
          </TableBody>
          <TableFooter>
            <Tr>
              <Td colSpan={8}>
                <MyPagination
                  pageCount={Math.ceil(guests.length / itemPerPage)}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </Td>
            </Tr>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Report;
