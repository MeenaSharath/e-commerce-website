"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const Wishlist = () => {
// const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
const wishlistItems = useSelector((state: RootState) => state.wishlistReducer.items);
  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[205px] ms-28">
                    <p className="text-dark">Image</p>
                  </div>
                  <div className="min-w-[387px] text-center">
                    <p className="text-dark">Product Name</p>
                  </div>

                  <div className="min-w-[387px]">
                    <p className="text-dark text-center">Unit Price</p>
                  </div>

                  {/* <div className="min-w-[265px]">
                    <p className="text-dark">Description</p>
                  </div> */}

                  {/* <div className="min-w-[205px] text-center">
                    <p className="text-dark text-right">Action</p>
                  </div> */}
                </div>

                {/* <!-- wish item --> */}
                
                {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((item) => <SingleItem key={item._id} item={item} />)
      )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
