"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

const SingleItem = () => {
  const router = useRouter();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/electronicspage`);
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="py-6 px-2 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F7FB] p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex justify-center mb-4 h-[220px]">
  <Image
    src={item.image}
    alt={item.name}
    width={200}
    height={200}
    className="object-contain h-full"
  />
</div>

            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Rating value={item.rating || 0} readOnly size="small" />
                <span className="text-sm text-gray-500">({item.rating})</span>
              </div>
                <p
          className="text-base font-semibold text-gray-800 mb-1 leading-tight hover:underline"
          onClick={() =>
            router.push(
              `/item-details?name=${encodeURIComponent(item.name)}&price=${item.price}&image=${encodeURIComponent(item.image)}&_id=${item._id}&rating=${item.rating || 0}`
            )
          }
        >
          {item.name}
        </p>
              <div className="text-lg font-medium text-blue-600">
                ₹{item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleItem;
