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
    animation: "fade",
    interval: 3000,
    timeout: 500,
    showThumbs: false,
    stopOnHover: true,
  };
  return (
    
      <Carousel {...carouselSettings} >
        {items.map((item, index) => (
          <Paper
            key={index}
            elevation={16}
            style={{ padding: 20, textAlign: "center" }}
          >
            <img
              src={item.imagePath}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "430px", maxWidth: "1100px" }}
            />
            <Typography variant="h5" component="div" gutterBottom>
              {item.title}
            </Typography>
            {/* <Typography variant="body1">{item.content}</Typography> */}
          </Paper>
        ))}
      </Carousel>
  );
};

export default CarouselComponent;
