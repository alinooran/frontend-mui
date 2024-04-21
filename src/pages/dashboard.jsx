import { Box, Button, Drawer, Stack, TextField } from "@mui/material";
import Navbar from "../components/navbar";
import SideMenu from "../components/sideMenu";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { AppContext } from "../context/context";

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 0 4px #AAAAAA",
  width: "70%",
  maxWidth: "1200px",
  // display: 'felx',
  // justifyContent: 'center',
  // justifySelf: 'center',
  // display: '',
  // marginLeft: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Dashboard = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const closeMenu = () => {
    setSideMenu(false);
  };

  const openMenu = () => {
    setSideMenu(true);
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
