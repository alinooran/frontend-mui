import styled from "@emotion/styled";
import { Logout, Menu, Person } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import { useNavigate } from "react-router-dom";

const Profile = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
  alignItems: "center",
  color: theme.palette.text.main,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MyIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.main,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({ onMenuClick }) => {
  const { context } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <MyIconButton onClick={onMenuClick}>
          <Menu fontSize="large" />
        </MyIconButton>
        <Profile>
          <Person />
          <Typography>{context.profile.name}</Typography>
        </Profile>
        <Button
          onClick={handleLogout}
          size="small"
          disableElevation
          startIcon={<Logout />}
          variant="contained"
          color="primary"
          sx={{
            gap: 1,
          }}
        >
          <Typography variant="button" marginLeft={2}>
            خروج
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
