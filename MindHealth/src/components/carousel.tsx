import { Paper, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  const items = [
    {
      title: "Human Brain",
      content: "This is the content for Slide 1.",
      imagePath: "./src/assets/Brain3D.png",
    },
    {
      title: "Cosmic Brain",
      content: "This is the content for Slide 2.",
      imagePath: "./src/assets/MindIsBigger.png",
    },
    {
      title: "Socialize",
      content: "This is the content for Slide 3.",
      imagePath: "./src/assets/Socialize.png",
    },
  ];

  const carouselSettings = {
    autoPlay: true, // Enable automatic slide changes
    interval: 4000, // Set interval to 4000 milliseconds (4 seconds)
    infiniteLoop: true, // Enable infinite looping
    showThumbs: false, // Hide thumbnail navigation
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
          {/* <Typography variant="body1">{item.content}</Typography> */}
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;