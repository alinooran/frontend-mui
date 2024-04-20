import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MyListItemText } from "./custom";

// const MyListItemText = styled(ListItemText)(({ theme }) => ({
//   color: theme.palette.text.main,
//   marginRight: theme.spacing(-3),
//   textAlign: "right",
// }));

const SideMenuItem = ({ text, icon }) => {
  const theme = useTheme();

  return (
    <ListItem disableGutters disablePadding sx={{ paddingLeft: 4 }}>
      <ListItemButton disableRipple>
        <ListItemIcon sx={{ color: theme.palette.text.main }}>
          {icon}
        </ListItemIcon>
        <MyListItemText
          primaryTypographyProps={{ fontSize: "0.8em" }}
          primary={text}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SideMenuItem;
