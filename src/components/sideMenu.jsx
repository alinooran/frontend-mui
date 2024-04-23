import styled from "@emotion/styled";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SideMenuItem from "./sideMenuItem";
import {
  Add,
  ArrowBack,
  BarChart,
  Description,
  Home,
  Person,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { MyListItemText } from "./custom";
import { useContext } from "react";
import { AppContext } from "../context/context";

const MyList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.main,
  height: "100%",
}));

const SideMenu = ({onMenuClose}) => {
  const theme = useTheme();
  const {context} = useContext(AppContext);

  return (
    <MyList sx={{width: '220px'}}>
      <ListItem
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"}>
          <ListItemIcon sx={{ color: theme.palette.text.main }}>
            <Person />
          </ListItemIcon>
          <MyListItemText
            primary={context.profile.name}
            primaryTypographyProps={{ fontSize: "0.8em" }}
          />
        </Stack>
        <IconButton onClick={onMenuClose} sx={{ margin: -1, color: theme.palette.text.main }}>
          <ArrowBack />
        </IconButton>
      </ListItem>
      <Divider
        color={theme.palette.text.main}
        sx={{ display: { xs: "flex", sm: "none" }, margin: "0 14px" }}
      />
      <SideMenuItem text={"خانه"} icon={<Home />} href={'/dashboard'} />
      <SideMenuItem text={"ثبت درخواست جدید"} icon={<Add />} href={'/dashboard/addrequest'} />
      <SideMenuItem text={"مشاهده درخواست ها"} icon={<Description />} />
      <SideMenuItem text={"دریافت گزارش"} icon={<BarChart />} />
    </MyList>
  );
};

export default SideMenu;
