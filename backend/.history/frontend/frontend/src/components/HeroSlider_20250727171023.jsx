import React from 'react'
import Slider from "react-slick";
import carousel_1 from "../../public/img/hero-carousel/hero-carousel-1.jpg"

import carousel_2 from "../../public/img/hero-carousel/hero-carousel-2.jpg"


import carousel_3 from "../../public/img/hero-carousel/hero-carousel-3.jpg"

function HeroSlider() {

const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false
  };


  const slides = [
  {
    image: carousel_1,
    title: "Your Health, Our Priority",
    text: "We provide advanced medical care with experienced doctors, modern technology, and a caring approach for every patient.",
  },
  {
    image: carousel_2,
    title: "Specialized Medical Services",
    text: "From cardiology to pediatrics, our expert teams are ready to help you and your family stay healthy and safe.",
  },
  {
    image: carousel_3,
    title: "Easy Online Appointments",
    text: "Book your appointment quickly and conveniently with top doctors at your preferred time.",
  }
];

    

  return (
    <div>HeroSlider</div>
  )
}

export default HeroSlider