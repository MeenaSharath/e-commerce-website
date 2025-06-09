"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroCarousal = () => {
  const [offers, setOffers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("https://e-commerce-project-dashboard.onrender.com/offerspage");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {offers.map((offer, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                  {offer.off}%
                </span>
                <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                  Sale
                  <br />
                  Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                <a href="#">{offer.name}</a>
              </h1>

              <p>{offer.des || "No description available."}</p>

              <button
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10" onClick={() =>
                router.push(
                  `/offer-item-details?name=${encodeURIComponent(offer.name)}&price=${offer.price}&image=${encodeURIComponent(offer.image)}&des=${encodeURIComponent(offer.des)}&off=${offer.off}&_id=${offer._id}`
                )
              }
              >
                Shop Now
              </button>
            </div>

            <div>
              <Image
                src={offer.image}
                alt={offer.name}
                width={351}
                height={351}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
