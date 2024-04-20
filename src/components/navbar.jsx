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

const Navbar = ({onMenuClick}) => {
 
  return (
    <AppBar position="sticky">
      <Toolbar>
        <MyIconButton onClick={onMenuClick}>
          <Menu fontSize="large" />
        </MyIconButton>
        <Profile>
          <Person />
          <Typography>علی نوران</Typography>
        </Profile>
        <Button
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
