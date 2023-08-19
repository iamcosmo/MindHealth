import { ThemeProvider, createTheme } from "@mui/material";
import {useNavigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CarouselComponent from "./components/carousel";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useState } from "react";



const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3", 
    },
    secondary: {
      main: "#FFC107", 
    },
    background: {
      default: "#121212", 
      paper: "#1E1E1E", 
    },
    text: {
      primary: "#FFFFFF", 
      secondary: "#B0B0B0", 
    },
  },
});

function App() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(true); 

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
    navigate("/");
    handleLoginOpen();
  };
  return (
    <>
     
        <ThemeProvider theme={darkTheme}>
          <NavBar />
          <CarouselComponent />
          <Routes>
            <Route path="/login" element={isLoginOpen&&<LoginPage onClose={handleLoginClose} />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      
    </>
  );
}

export default App;
