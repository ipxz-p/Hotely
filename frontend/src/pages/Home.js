import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import BookingForm from "../components/BookingForm";
import ImageGallery from "../components/ImageGallery";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#fcf6ec]">
      <Navbar />
      <Banner />
      <BookingForm />
      <ImageGallery />
      <Footer />
    </div>
  );
};

export default Home;
