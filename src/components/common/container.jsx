import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: "1em 1em",
  [theme.breakpoints.up("lg")]: {
    width: "80%",
    minWidth: "580px",
    maxWidth: "1400px",
    alignItems: "center",
    padding: "2em 2em",
  }
}));

export default Container;