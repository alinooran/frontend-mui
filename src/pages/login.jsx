import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Stack, Typography } from "@mui/material";
import Input from "../components/input";
import { useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { useNavigate } from "react-router-dom";

const Form = styled(Stack)(({ theme }) => ({
  width: "30%",
  minWidth: "300px",
  maxWidth: "500px",
  margin: "60px auto 0 auto",
  alignItems: "center",
  padding: "20px 0 40px 0",
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
      <img
        src="/assets/icons/login.svg"
        width="96px"
        style={{
          filter:
            "invert(52%) sepia(53%) saturate(5886%) hue-rotate(227deg) brightness(105%) contrast(101%)",
        }}
      />
      <Input
        width={"80%"}
        labelSx={labelStyle}
        label={"نام کاربری"}
        type={"text"}
        name={"username"}
        value={formData.username}
        onChange={handleInput}
        containerSx={{margin: "32px 0 16px 0"}}
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
        sx={{margin: "8px 10% 16px 10%"}}
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
