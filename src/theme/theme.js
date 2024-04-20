import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(90deg, rgba(131,111,255,1) 0%, rgba(79,67,153,1) 100%)",
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none" ,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "vazir",
  },
  palette: {
    primary: {
      main: "#211951",
    },
    secondary: {
      main: "#836FFF",
    },
    text: {
      main: "#F0F3FF",
    },
    label: {
      main: "#707B8B",
    },
    grey: {
      main: "#DDDDDD",
    },
  },
});

export default theme;
