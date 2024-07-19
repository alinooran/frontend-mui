import styled from "@emotion/styled";
import { ListItemText, TableCell, TableRow } from "@mui/material";

export const MyListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.main,
  marginRight: theme.spacing(-3),
  textAlign: "right",
}));

export const Tr = styled(TableRow)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey.main}`,
}));

export const Th = styled(TableCell)(({ theme }) => ({
  textAlign: "right",
  padding: "0.4em",
  fontWeight: "bold",
  fontSize: "0.9em",
  border: "none",
}));

export const Td = styled(TableCell)(({ theme }) => ({
  textAlign: "right",
  padding: "0.4em",
  fontSize: "0.9em",
  borderBottom: "none",
}));
