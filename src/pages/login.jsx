import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Input from "../components/input";
import { useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { useNavigate } from "react-router-dom";

const Form = styled(Stack)(({ theme }) => ({
  backgroundColor: "white",
  width: "30%",
  minWidth: "300px",
  maxWidth: "500px",
  margin: "60px auto 0 auto",
  alignItems: "center",
  boxShadow: "0 0 4px #AAAAAA",
  borderRadius: "4px",
  padding: "20px 0 40px 0",
  gap: 4,
}));

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const labelStyle = { color: theme.palette.secondary.main, fontSize: "1em" };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      if (res.data.role === "security") {
        navigate("/security");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error.message);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  return (
    <Form>
      <Typography variant="h4" color={theme.palette.primary.main}>
        ورود به سامانه
      </Typography>
      <Input
        width={"80%"}
        labelSx={labelStyle}
        label={"نام کاربری"}
        type={"text"}
        name={"username"}
        value={formData.username}
        onChange={handleInput}
      />
      <Input
        width={"80%"}
        labelSx={labelStyle}
        label={"رمز عبور"}
        type={checked ? "text" : "password"}
        name={"password"}
        value={formData.password}
        onChange={handleInput}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        alignSelf={"flex-start"}
        marginRight={"10%"}
      >
        <input
          type="checkbox"
          id="show_password"
          checked={checked}
          onChange={handleCheckbox}
          style={{
            accentColor: theme.palette.secondary.main,
            marginLeft: theme.spacing(1),
          }}
        />
        <label
          style={{ ...labelStyle, fontSize: "0.8em" }}
          htmlFor="show_password"
        >
          نمایش رمز عبور
        </label>
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{
          fontSize: "1em",
          width: "80%",
          marginTop: 2,
        }}
      >
        ورود
      </Button>
      {error && (
        <Typography variant="caption" color={"red"}>
          {error}
        </Typography>
      )}
    </Form>
  );
};

export default Login;
