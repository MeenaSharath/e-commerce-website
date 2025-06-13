import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import ProtectedRoute from '@/components/ProtectedRoute';

const Home = () => {
  return (
    <ProtectedRoute>
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      {/* <PromoBanner /> */}
      <BestSeller />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
    </ProtectedRoute>
  );
};

export default Home;
