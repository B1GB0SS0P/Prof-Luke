import { createTheme } from "@mui/material/styles";

export default function getTheme() {
    const brand = {
        lighter: '#A9CEF4',
        light: '#7EA0B7',
        neutral: '#597081',
        dark: '#36494E',
        darker: '#000'
    }

    return createTheme({
        palette: {
            header: {
                background: brand.dark,
                text: brand.lighter
            },
            overall: {
                background: brand.darker
            },
            search: {
                background: brand.light,
                text: 'white'
            }
        }
    })
}