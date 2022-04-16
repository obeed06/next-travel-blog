import {createTheme} from "@mui/material/styles";
import {deepOrange, pink} from "@mui/material/colors";


export const lightTheme = createTheme({
    palette: {
        primary:  deepOrange,
        secondary: pink,
        mode: "light",
    }
})
export const darkTheme = createTheme({
    palette: {
        primary:  deepOrange,
        secondary: pink,
        mode: "dark",
    }
})