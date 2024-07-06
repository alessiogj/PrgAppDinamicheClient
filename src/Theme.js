import { createTheme } from '@mui/material/styles';

// Palette di colori che rispettano le linee guida di accessibilità WCAG AAA

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blu con buon contrasto su sfondo bianco
            contrastText: '#ffffff', // Testo bianco per un buon contrasto su blu
        },
        secondary: {
            main: '#dc004e', // Magenta scuro con buon contrasto su sfondo bianco
            contrastText: '#ffffff', // Testo bianco per un buon contrasto su magenta
        },
        tertiary: {
            main: '#6d6d6d', // Grigio scuro, buon contrasto per azioni minori
            contrastText: '#ffffff', // Testo bianco per un buon contrasto su grigio scuro
        },
        error: {
            main: '#c62828', // Rosso scuro, buon contrasto su sfondo bianco
        },
        background: {
            default: '#fafafa', // Uno sfondo chiaro
            paper: '#ffffff',
        },
        text: {
            primary: '#212121', // Nero scuro, ottimo contrasto su sfondo chiaro
            secondary: '#424242', // Grigio scuro, sufficiente contrasto su sfondo chiaro
        },
        line: {
            orderAmount: '#1976d2', // Blu
            advanceAmount: '#dc004e', // Magenta scuro
            outstandingAmount: '#f9a825', // Giallo scuro per differenziarsi e mantenere buon contrasto
        }
    },
});

export default theme;