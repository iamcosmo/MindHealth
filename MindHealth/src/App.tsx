import {  useMediaQuery } from "@mui/material";
import { useNavigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginRegister from "./pages/LoginRegister";
import ProfilePage from "./pages/ProfilePage";
import { useState,useEffect } from "react";
import Carousel3D from "./components/Carousel3D";
import darkTheme from "./assets/themes/darkTheme";
import cardData from "./assets/data/cardData";
import axios from "axios";

axios.defaults.baseURL='http://localhost:4000';

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

  const isMobile = useMediaQuery(() => darkTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(() => darkTheme.breakpoints.between('sm', 'md'));

  let carouselWidth = '60rem'; 

  if (isMobile) {
    carouselWidth = '13rem';
    console.log("Carousel width: ",carouselWidth);
    
  } else if (isTablet) {    
    carouselWidth = '30rem'; 
    console.log("Carousel width: ",carouselWidth);
  }


    
  const [activeIndex, setActiveIndex] = useState(0);

  const incrementActiveIndex = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  useEffect(() => {
    const timer = setInterval(incrementActiveIndex, 5000); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
        <NavBar />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Carousel3D activeIn={activeIndex} containerWidth={carouselWidth}>
            {cardData.map((card, index) => (
              <div className="card" key={index}>
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </div>
            ))}
          </Carousel3D>
        </div>
        <Routes>
          <Route
            path="/login"
            element={isLoginOpen && <LoginRegister onClose={handleLoginClose} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </>
  );
}

export default App;
