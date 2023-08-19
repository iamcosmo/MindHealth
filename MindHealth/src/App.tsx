

import { ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import CarouselComponent from "./components/carousel";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // Customize the primary color
    },
    secondary: {
      main: '#FFC107', // Customize the secondary color
    },
    background: {
      default: '#121212', // Customize the default background color
      paper: '#1E1E1E',   // Customize the paper background color (cards, etc.)
    },
    text: {
      primary: '#FFFFFF', // Customize the primary text color
      secondary: '#B0B0B0', // Customize the secondary text color
    },
  },
});

function App() {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <NavBar />
      <CarouselComponent/>
      </ThemeProvider>
    </>
  );
}

export default App;
