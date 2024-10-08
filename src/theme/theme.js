import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      s: 500,
      sm: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
          boxShadow: "none",
          fontSize: "0.8em",
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
      light: "#302475",
      dark: "#18123b",
      contrastText: "#F0F3FF"
    },
    secondary: {
      main: "#836FFF",
      dark: "#644dff",
      light: "#a799ff",
      contrastText: "#F0F3FF"
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
