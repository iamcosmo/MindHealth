import { Paper, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  const items = [
    {
      title: "Human Brain",
      imagePath: "./src/assets/Brain3D.png",
    },
    {
      title: "Cosmic Brain",      
      imagePath: "./src/assets/MindIsBigger.png",
    },
    {
      title: "Socialize",
      imagePath: "./src/assets/Socialize.png",
    },
  ];

  const carouselSettings = {
    autoPlay: true, 
    interval: 4000, 
    infiniteLoop: true, 
    showThumbs: false, 
  };
  return (
    <Carousel {...carouselSettings}>
      {items.map((item, index) => (
        <Paper
          key={index}
          elevation={3}
          style={{ padding: 20, textAlign: "center" }}
        >
          <img
            src={item.imagePath}
            alt={`Slide ${index + 1}`}
            style={{ width: '100%', height: '370px', maxWidth: '800px' }} 
          />
          <Typography variant="h5" component="div" gutterBottom>
            {item.title}
          </Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
