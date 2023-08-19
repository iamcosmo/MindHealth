import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CarouselComponent from "./components/carousel";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3", // Customize the primary color
    },
    secondary: {
      main: "#FFC107", // Customize the secondary color
    },
    background: {
      default: "#121212", // Customize the default background color
      paper: "#1E1E1E", // Customize the paper background color (cards, etc.)
    },
    text: {
      primary: "#FFFFFF", // Customize the primary text color
      secondary: "#B0B0B0", // Customize the secondary text color
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <NavBar />
          <CarouselComponent />
          <Routes>
            <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
            <Route path="/profile" element={<ProfilePage />} />{" "}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
