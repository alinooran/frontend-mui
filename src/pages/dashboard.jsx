import { Box, Button, Drawer, Stack, TextField } from "@mui/material";
import Navbar from "../components/navbar";
import SideMenu from "../components/sideMenu";
import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import {api} from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {toastOption} from "../util/util";

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 0 4px #AAAAAA",
  width: "70%",
  maxWidth: "1200px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Dashboard = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const { context, setContext } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const closeMenu = () => {
    setSideMenu(false);
  };

  const openMenu = () => {
    setSideMenu(true);
  };

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

  return (
    <Stack height={"100vh"}>
      <Navbar onMenuClick={openMenu} />
      <Stack direction={"row"} height={"100%"}>
        <Drawer
          open={sideMenu}
          anchor="right"
          onClose={closeMenu}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <SideMenu onMenuClose={closeMenu} />
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <SideMenu />
        </Box>
        {/* <Stack direction={'row'} width={'80%'} justifyContent={'center'} sx={{border: '5px solid red'}}> */}
        {/* <PageContainer>Article</PageContainer> */}
        {/* </Stack> */}
      </Stack>
    </Stack>
  );
};

export default Dashboard;
