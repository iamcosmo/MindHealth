import React, {useEffect, useState} from "react";
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';

interface CarouselProps {
    children: React.ReactNode;
    activeIn: number;
    containerWidth: string;
  }
const MAX_VISIBILITY = 3;

const Carousel3D: React.FC<CarouselProps> = ({children,activeIn,containerWidth}) => {
    const count = React.Children.count(children);
    const [currentIndex, setCurrentIndex] = useState(activeIn);
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % count);
        }, 5000); 
    
        return () => {
          clearInterval(timer);
        };
      }, [count]);
    
    return (
      <div className='carousel' style={{width:containerWidth}} >
        {currentIndex>0&& <button className='nav left' onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + count) % count)}><TiChevronLeftOutline/></button>}
        {React.Children.map(children, (child, i) => (
          <div
          className='card-container'
          style={{
            '--active': i === currentIndex ? 1 : 0,
            '--offset': (currentIndex - i) / 3,
            '--direction': Math.sign(currentIndex - i),
            '--abs-offset': Math.abs(currentIndex - i) / 3,
            pointerEvents: currentIndex === i ? 'auto' : 'none',
            opacity: Math.abs(currentIndex - i) >= MAX_VISIBILITY ? 0 : 1,
            display: Math.abs(currentIndex - i) > MAX_VISIBILITY ? 'none' : 'block',            
          } as React.CSSProperties} 
        >              
            {child}
          </div>
        ))}
        {currentIndex<count-1&& <button className='nav right' onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % count)}><TiChevronRightOutline/></button>}
      </div>
    );
}

export default Carousel3D;





