import styled from "@emotion/styled";
import {
  Button,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Input, InputDate } from "../components/input";
import { useTheme } from "@emotion/react";
import {
  ArrowBackIos,
  ArrowForwardIos,
  DeleteForever,
} from "@mui/icons-material";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { Td, Th, Tr } from "../components/custom";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_calendar from "react-date-object/calendars/gregorian";

const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: "0 1em",
  [theme.breakpoints.up("sm")]: {
    width: "75%",
    minWidth: "580px",
    maxWidth: "1200px",
    alignItems: "center",
    padding: "0 2em",
  },
}));

const Top = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  padding: "0 5%",
  marginBottom: "3em",
  [theme.breakpoints.down("s")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
}));

const Guest = styled(Stack)(({ theme }) => ({
  padding: "12px 5%",
  border: "1px solid black",
  width: "100%",
  position: "relative",
  gap: "18px",
}));

const GuestTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4em",
  position: "absolute",
  top: "-15px",
  right: "calc(5% - 12px)",
  backgroundColor: "white",
  padding: "0 12px",
}));

const TdButton = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  padding: "0.4em",
  fontSize: "0.9em",
}));

const AddRequest = () => {
  const theme = useTheme();
  const [guest, setGuest] = useState({
    first_name: "",
    last_name: "",
    national_code: "",
    start_time: "",
    end_time: "",
  });
  const [request, setRequest] = useState({
    date: "",
    date_jalali: "",
  });
  const [guests, setGuests] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;

  const guestSchema = yup.object({
    first_name: yup.string().required("این فیلد ضروری است"),
    last_name: yup.string().required("این فیلد ضروری است"),
    national_code: yup
      .string()
      .test("is_national_code_valid", "کد ملی وارد شده صحیح نیست", (value) => {
        const check = parseInt(value.charAt(9));
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(value.charAt(i)) * (10 - i);
        }
        sum %= 11;
        return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
      })
      .matches(/^\d{10}$/, "کد ملی باید شامل 10 رقم باشد")
      .matches(/^\d*$/, "ورودی باید عدد باشد")
      .required("این فیلد ضروری است"),
    start_time: yup.string().required("این فیلد ضروری است"),
    end_time: yup.string().required("این فیلد ضروری است"),
  });

  const requestSchema = yup.object({
    date: yup
      .string()
      .matches(/\d{4}\/\d{2}\/\d{2}/, "فرمت تاریخ صحیح نیست")
      .required("این فیلد ضروری است"),
  });

  const handleGuestInput = (e) => {
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const addGuest = async () => {
    setErrors({});

    try {
      await guestSchema.validate(guest, { abortEarly: false });
      setGuests([...guests, guest]);
      setGuest({
        first_name: "",
        last_name: "",
        national_code: "",
        start_time: "",
        end_time: "",
      });
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleDelete = (idx) => {
    setGuests(guests.filter((e, i) => i !== idx));
  };

  const handleDate = (val) => {
    setRequest({
      date_jalali: val.format(),
      date: val.convert(gregorian_calendar, gregorian_en).format(),
    });
  };

  const handleSubmit = async (e) => {
    setErrors({});

    try {
      await requestSchema.validate(request, { abortEarly: false });
      addRequest();
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const addRequest = async () => {
    if (guests.length > 0) {
      try {
        await api.post("/request", {
          date: request.date,
          guests: guests,
        });
        toast.success("درخواست با موفقیت ثبت شد", toastOption);
        navigate("/dashboard");
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error.message, toastOption);
        } else {
          toast.error("خطایی در سرور رخ داده", toastOption);
        }
      }
    } else {
      toast.error("هیچ مهمانی ثبت نشده است", toastOption);
    }
  };

  return (
    <Container>
      <Top>
        <InputDate
          label={"تاریخ"}
          error={errors.date}
          width="30%"
          onChange={handleDate}
          containerSx={{ minWidth: "250px" }}
        />
        <Button
          onClick={handleSubmit}
          size="medium"
          variant="contained"
          color="success"
        >
          ثبت درخواست
        </Button>
      </Top>
      <Guest>
        <GuestTitle variant="h2">اطلاعات مهمان</GuestTitle>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={2}
        >
          <Input
            label={"نام"}
            type={"text"}
            name={"first_name"}
            onChange={handleGuestInput}
            value={guest.first_name}
            error={errors.first_name}
            width="30%"
            containerSx={{ minWidth: "250px" }}
          />
          <Input
            label={"نام خانوادگی"}
            width="30%"
            containerSx={{ minWidth: "250px" }}
            type={"text"}
            name={"last_name"}
            onChange={handleGuestInput}
            value={guest.last_name}
            error={errors.last_name}
          />
          <Input
            label={"کد ملی"}
            width="30%"
            containerSx={{ minWidth: "250px" }}
            type="text"
            name={"national_code"}
            value={guest.national_code}
            onChange={handleGuestInput}
            error={errors.national_code}
          />
        </Stack>
        <Stack>
          <Typography fontSize={"0.9em"}>بازه زمانی ورود:</Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "30%", minWidth: "250px" }}
          >
            <Input
              type={"time"}
              onChange={handleGuestInput}
              label={"شروع بازه"}
              width="45%"
              name={"start_time"}
              value={guest.start_time}
              error={errors.start_time}
            />
            <Input
              type={"time"}
              onChange={handleGuestInput}
              label={"پایان بازه"}
              width="45%"
              name={"end_time"}
              value={guest.end_time}
              error={errors.end_time}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"}>
          <Button variant="contained" color="secondary" onClick={addGuest}>
            افزودن مهمان
          </Button>
        </Stack>
      </Guest>
      <TableContainer width={"100%"} sx={{ overflowX: "auto" }}>
        <Table sx={{ margin: "3em 0", minWidth: "750px" }}>
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
                    <TdButton>
                      <IconButton
                        onClick={() => handleDelete(i)}
                        sx={{ padding: 0 }}
                      >
                        <DeleteForever color="error" />
                      </IconButton>
                    </TdButton>
                  </Tr>
                );
              })}
          </TableBody>
          <TableFooter>
            <Tr>
              <Td colSpan={6}>
                <Pagination
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
    </Container>
  );
};

export default AddRequest;
