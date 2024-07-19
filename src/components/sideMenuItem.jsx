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
import { Link } from "react-router-dom";


const SideMenuItem = ({ text, icon, href }) => {
  const theme = useTheme();

  return (
    <ListItem disableGutters disablePadding sx={{ paddingLeft: 4 }}>
      <Link to={href}>
        <ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}}} disableRipple>
          <ListItemIcon sx={{ color: theme.palette.text.main }}>
            {icon}
          </ListItemIcon>
          <MyListItemText
            primaryTypographyProps={{ fontSize: "0.8em" }}
            primary={text}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SideMenuItem;
