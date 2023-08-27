import { useEffect, useState } from "react";
import Carousel3D from "./Carousel3D";
import cardData from "../assets/data/cardData";
import { useMediaQuery } from "@mui/material";
import darkTheme from "../assets/themes/darkTheme";

const Carousel3DMap = () => {
    const isMobile = useMediaQuery(() => darkTheme.breakpoints.down("sm"));
const isTablet = useMediaQuery(() => darkTheme.breakpoints.between("sm", "md"));

let carouselWidth = "60rem";

if (isMobile) {
  carouselWidth = "13rem";
  console.log("Carousel width: ", carouselWidth);
} else if (isTablet) {
  carouselWidth = "30rem";
  console.log("Carousel width: ", carouselWidth);
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
            <h4>{card.subtitle}</h4>
            <p>{card.content}</p>
          </div>
        ))}
      </Carousel3D>
    </div>
  );
};

export default Carousel3DMap;
