"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

interface Offer {
  name: string;
  off: number;
  image: string;
  price: number;
}

const Hero = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/offers`);
        const data = await response.json();
        console.log(data);
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-60 sm:pt-60 lg:pt-60 xl:pt-60 mt-20 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4">
  <div className="flex flex-nowrap items-stretch gap-5">
    {/* Left Side: Carousel */}
    <div className="w-[60%]">
      <div className="relative z-1 rounded-[10px] bg-white pe-2">
        <Image
          src="/images/hero/hero-bg.png"
          alt="hero bg shapes"
          className="absolute right-0 bottom-0 -z-1"
          width={534}
          height={520}
        />
        <HeroCarousel />
      </div>
    </div>

    {/* Right Side: Offers */}
    <div className="w-full">
      <div className="flex flex-col gap-5 overflow-auto">
        {offers.slice(7, 9).map((offer, index) => (
          <div
            key={index}
            className="flex-1 relative rounded-[10px] bg-white p-4"
          >
            <div className="flex ms-8 items-center gap-14">
              <div>
                <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                  <a href="#">{offer.name}</a>
                </h2>
                <div>
                  <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                    limited time offer
                  </p>
                  <span className="flex items-center gap-3">
                    <span className="font-medium text-heading-5 text-red">
                      ₹{offer.price}
                    </span>
                    <span className="font-medium text-xl text-dark-4">
                      {offer.off}% Off
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <Image
                  src={offer.image}
                  alt="product image"
                  width={123}
                  height={161}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



      {/* Hero features */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
