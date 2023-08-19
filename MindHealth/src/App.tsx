

import { ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import CarouselComponent from "./components/carousel";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FFC107', 
    },
    background: {
      default: '#121212', 
      paper: '#1E1E1E',   )
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#B0B0B0', 
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
