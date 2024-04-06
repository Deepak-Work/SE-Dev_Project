import { PaletteOptions } from "@mui/material";

interface CustomPaletteOptions extends PaletteOptions {
    back?: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
  }

  export default CustomPaletteOptions;