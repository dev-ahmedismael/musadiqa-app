import { green, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { arSA } from "@mui/material/locale";

export const lightTheme = createTheme(
  {
    direction: "rtl",
    cssVariables: true,
    palette: {
      mode: "light",
      primary: {
        main: "#0aa14a",
        contrastText: "white",
      },
      success: {
        main: green[500],
      },
      error: {
        main: red[700],
      },
      secondary: {
        main: "#f3f4f6",
      },
    },
    typography: {
      fontFamily: `'Roboto', 'Arial', sans-serif`,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
          fullWidth: true,
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: "small",
          fullWidth: true,
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              boxShadow: "0 0 0 1000px white inset !important",
              WebkitTextFillColor: "#000 !important",
            },
          },
        },
      },
    },
  },
  arSA
);
