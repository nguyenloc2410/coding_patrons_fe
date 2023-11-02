import React from "react";
import "./slider.scss";
import { Slide } from "hero-slider";
import HeroSlider from "hero-slider";
import logo1 from "../../assets/hill.jpeg";
import logo2 from "../../assets/sailboat.jpg";
import logo3 from "../../assets/logowelcome.jpg";
const Slider = () => {
  return (
    <div className="pin_image">
      <HeroSlider
        autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 50,
          slidingDelay: 50,
        }}
      >
        <Slide
          background={{
            backgroundImageSrc: logo1,
          }}
        ></Slide>
        <Slide
          background={{
            backgroundImageSrc: logo2,
          }}
        ></Slide>
        <Slide
          background={{
            backgroundImageSrc: logo3,
            backgroundImageSizes: "cover",
          }}
        ></Slide>
      </HeroSlider>
    </div>
  );
};
export default Slider;
