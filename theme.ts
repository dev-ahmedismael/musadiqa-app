import { red, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { arSA } from "@mui/material/locale";

export const lightTheme = createTheme(
  {
    direction: "rtl",
    cssVariables: true,
    palette: {
      mode: "light",
      primary: {
        main: teal["500"],
      },
      success: {
        main: teal[500],
      },
      error: {
        main: red[700],
      },
    },
    typography: {
      fontFamily: `'Cairo', 'Roboto', 'Arial', sans-serif`,
    },
  },
  arSA
);
