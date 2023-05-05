import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFEAFA",
      dark: "#FFFFFF",
    },
    background: {
      default: "#08162C",
      paper: "#FFFFFF",
    },
    secondary: {
      main: "#CDDDF4",
    },
    text: {
      secondary: "#ffffff",
    },
  },
  typography: {
    button: {
      fontFamily: "Forum",
      textTransform: "none",
    },
    body2: {
      fontFamily: "Mrs Saint Delafield",
    },
    body1: {
      fontFamily: "Forum",
    },
    subtitle2: {
      fontFamily: "Work Sans",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "Forum",
    },
    h6: {
      fontFamily: "Forum",
    },
    h5: {
      fontFamily: "Forum",
    },
    h4: {
      fontFamily: "Forum",
    },
    h3: {
      fontFamily: "Forum",
    },
    h2: {
      fontFamily: "Forum",
    },
    h1: {
      fontFamily: "Forum",
    },
    caption: {
      fontFamily: "Work Sans",
    },
    overline: {
      fontFamily: "Work Sans",
    },
  },
});
