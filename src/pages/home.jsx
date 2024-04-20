import { Box, Button, Drawer, Stack, TextField } from "@mui/material";
import Navbar from "../components/navbar";
import SideMenu from "../components/sideMenu";
import styled from "@emotion/styled";
import { useState } from "react";

const PageContainer = styled(Stack)({
  backgroundColor: "skyblue",
});

const Home = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const closeMenu = () => {
    setSideMenu(false);
  }

  const openMenu = () => {
    setSideMenu(true);
  }

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
        {/* <PageContainer>
            Article
          </PageContainer> */}
      </Stack>
    </Stack>
  );
};

export default Home;
