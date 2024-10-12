import React, { useState } from "react";

const images = [
  "banner1.png",
  "banner2.png",
  "banner3.png",
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="mt-[60px] relative w-full max-w-full overflow-hidden h-auto">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Banner;
