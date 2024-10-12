import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import BookingForm from "../components/BookingForm";
import ImageGallery from "../components/ImageGallery";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <BookingForm />
      <ImageGallery />
    </div>
  );
};

export default Home;
