import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
// import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Home = () => {
  // const checkingAuth = useAuthRedirect();

  // if (checkingAuth) {
  //   return <div className="text-center mt-20 text-lg">Checking authentication...</div>;
  // }
  return (
    
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
    
  );
};

export default Home;
