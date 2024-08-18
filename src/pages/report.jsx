import {
  Box,
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
import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { Print, Search } from "@mui/icons-material";
import { Td, Th, Tr } from "../components/custom";
import MyPagination from "../components/pagination";
import usePagination from "../customHooks/usePagination";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_calendar from "react-date-object/calendars/gregorian";
import * as yup from "yup";
import { AppContext } from "../context/context";

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
  const [department, setDepartment] = useState({ title: "همه", value: "0" });
  const [name, setName] = useState("");
  const [arrival, setArrival] = useState("");
  const [errors, setErrors] = useState({});
  const [host, setHost] = useState("");
  const [currentPage, setCurrentPage, handlePageChange] = usePagination();
  const itemPerPage = 30;
  const { context } = useContext(AppContext);

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
    if (context.profile.role === "dean") {
      setDepartmentOptions([
        {
          value: context.profile.department_id,
          title: context.profile.department_name,
        },
      ]);
      setDepartment({
        title: context.profile.department_name,
        value: context.profile.department_id,
      });
      return;
    }
    try {
      const res = await api.get(`/department`);
      const deps = [
        {
          value: 0,
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
      await filterSchema.validate({ date: date.date }, { abortEarly: false });
      fetchReport();
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const fetchReport = async () => {
    try {
      const reqBody = {
        date: date.date,
        department_id: department.value,
        guest_name: name,
        is_entered: arrival,
        host_name: host,
      };
      const res = await api.post("/guest/report", reqBody);
      res.data.data.forEach((g) => {
        if (g.entrance_time !== null) {
          const datetime = new Date(g.entrance_time);
          g.entrance_time = formatEntranceTime(datetime);
        }
      });
      setGuests(res.data.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  const generatePDF = async () => {
    window.print();
  };

  const formatEntranceTime = (datetime) => {
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const onDepartmentChange = (e) => {
    const value = e.target.value;
    const title = e.target.options[e.target.selectedIndex].innerHTML;
    setDepartment({
      title: title,
      value: value,
    });
  };

  return (
    <Container>
      <FilterBox sx={{ "@media print": { display: "none" } }}>
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
            onChange={onDepartmentChange}
            value={department.value}
            disabled={context.profile.role === "dean"}
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
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          "@media print": { display: "none" },
        }}
      >
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
            {guests
              .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
              .map((g, i) => {
                return (
                  <Tr key={g.id}>
                    <Td>{(currentPage - 1) * itemPerPage + i + 1}</Td>
                    <Td>{g.first_name}</Td>
                    <Td>{g.last_name}</Td>
                    <Td>{g.national_code}</Td>
                    <Td>{g.entrance_time}</Td>
                    <Td>{g.department_name}</Td>
                    <Td>{g.host_name}</Td>
                    <Td>{g.is_entered ? "مراجعه کرده" : "مراجعه نکرده"}</Td>
                  </Tr>
                );
              })}
          </TableBody>
          <TableFooter>
            <Tr>
              <Td colSpan={7}>
                <MyPagination
                  pageCount={Math.ceil(guests.length / itemPerPage)}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </Td>
              <Td>
                <Button
                  startIcon={<Print />}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  sx={{ gap: 1 }}
                  onClick={generatePDF}
                >
                  <Typography variant="caption" marginLeft={2}>
                    چاپ
                  </Typography>
                </Button>
              </Td>
            </Tr>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* this table is for printing now showing in page */}
      <Box
        sx={{
          display: "none",
          fontSize: "12px",
          "@media print": { display: "block" },
        }}
      >
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "2em", width: "100%" }}
          >
            <h4>تاریخ: {date.date_jalali}</h4>
            <h4>نام بخش: {department.title}</h4>
            <h4>نام مهمان: {name}</h4>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "2em", width: "100%" }}
          >
            <h4>
              وضعیت مراجعه:{" "}
              {arrival === ""
                ? "همه"
                : arrival === "false"
                ? "مراجعه نکرده"
                : "مراجعه کرده"}
            </h4>
            <h4>نام میزبان: {host}</h4>
          </Stack>
          <TableContainer sx={{ width: "100%", margin: "2em 1em", minWidth: "A4", maxWidth: "A0" }}>
            <Table>
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
                {guests.map((g, i) => {
                  return (
                    <Tr key={g.id}>
                      <Td>{i + 1}</Td>
                      <Td>{g.first_name}</Td>
                      <Td>{g.last_name}</Td>
                      <Td>{g.national_code}</Td>
                      <Td>{g.entrance_time}</Td>
                      <Td>{g.department_name}</Td>
                      <Td>{g.host_name}</Td>
                      <Td>{g.is_entered ? "مراجعه کرده" : "مراجعه نکرده"}</Td>
                    </Tr>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Report;
