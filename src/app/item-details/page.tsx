"use client";

import { useSearchParams } from "next/navigation";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addItemToWishlist, removeItemFromWishlist } from "@/redux/features/wishlist-slice";


export default function ItemDetails() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");
  const [liked, setLiked] = useState(false);

  const name = searchParams.get("name") || "";
  const image = searchParams.get("image") || "";
  const priceStr = searchParams.get("price");
  const _idStr = searchParams.get("_id");
  const rating = parseFloat(searchParams.get("rating") || "0");

  const price = priceStr ? parseInt(priceStr) : NaN;
  const _id = _idStr ? parseInt(_idStr) : NaN;

  if (!name || !image || isNaN(price) || isNaN(_id)) {
    return (
      <p className="p-4 text-center text-red-500 font-medium">
        Invalid item data.
      </p>
    );
  }

  const toggleWishlist = () => {
  setLiked(!liked);
  if (!liked) {
      dispatch(
  addItemToWishlist({
    _id: _id.toString(),
    name: name,
    price: price.toString(),
    quantity: 1,
    image: image,
    rating: rating,
    imgs: {
      previews: [image],
      thumbnails: [image],
    },
  })
);
  } else {
    dispatch(removeItemFromWishlist(_id.toString()));
  }
};

  const handleAddToCart = () => {
     dispatch(
      addItemToCart({
        id: _id, 
        title: name,
        // imgs: { previews: [image] },
       price,
        discountedPrice: price,
        // description: des,
        quantity: 1,
        imgs: {
      previews: [image],
      thumbnails: [], 
    },
        // category: "custom", // fallback or inferred value
        // status: "available",
        // reviews: 0,
      })
    );
    setMessage("Item added to cart!");
    // Clear message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
    
  };

  return (
    <div className="min-h-screen bg-[#F2F3F8] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 relative">
  {/* Wishlist Icon - Inside white background */}
  <button
    onClick={toggleWishlist}
    className="absolute top-4 right-4 text-3xl text-red-500 hover:scale-110 transition"
    title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
  >
    {liked ? <AiFillHeart className="text-red"/> : <AiOutlineHeart className="text-black"/>}
  </button>
       
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src={image}
            alt={name}
            className="w-full h-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-dark mb-4">{name}</h1>
          <p className="text-gray-700 text-xl mb-5 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            suscipit autem. Ipsum, ratione porro assumenda saepe voluptatum non
            delectus nesciunt.
          </p>
          <Rating value={rating} readOnly className="mb-4" />
          <p className="text-2xl font-semibold text-dark mb-6">
            ₹{price}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-dark text-white text-lg px-6 py-2 rounded-lg w-max transition duration-200 shadow-md hover:bg-blue-dark"
          >
            Add To Cart
          </button>
          {message && (
  <p className="mt-4 text-green-600 font-medium transition-opacity duration-500">
    {message}
  </p>
)}
        </div>
      </div>
    </div>
  );
}
