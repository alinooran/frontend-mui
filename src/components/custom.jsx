import styled from "@emotion/styled";
import { Alert, ListItemText, Snackbar } from "@mui/material";

export const MyListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.main,
  marginRight: theme.spacing(-3),
  textAlign: "right",
}));