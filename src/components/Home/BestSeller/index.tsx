import React from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";

const BestSeller = () => {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5 mt-15">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>
        </div>

        <div>
          {/* <!-- Best Sellers item --> */}
            <SingleItem />
          
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
