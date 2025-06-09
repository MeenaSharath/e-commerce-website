"use client";

import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addItemToWishlist, removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { toast } from "react-toastify";
import Image from 'next/image';


interface Product {
  _id: number;
  name: string;
  image: string;
  price: number;
  rating?: number;
}

const ITEMS_PER_PAGE = 8;

export default function SingleCatItemsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plink = searchParams.get("plink");
  const title = searchParams.get("title");
  const dispatch = useDispatch<AppDispatch>();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (!plink) {
      setError("No product link provided.");
      setLoading(false);
      return;
    }

    fetch(plink)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const results = Array.isArray(data.results) ? data.results : data;
        setProducts(results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [plink]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = (item: Product) => {
  if (wishlist.includes(item._id)) {
    setWishlist(wishlist.filter((id) => id !== item._id));
    dispatch(removeItemFromWishlist(item._id.toString()));
  } else {
    setWishlist([...wishlist, item._id]);
    dispatch(
      addItemToWishlist({
        _id: item._id.toString(),
        name: item.name,
        price: item.price.toString(),
        quantity: 1,
        image: item.image,
        rating: item.rating || 0,
        imgs: {
          previews: [item.image],
          thumbnails: [item.image],
        },
      })
    );
  }
};


  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading)
    return <p className="p-4 text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 w-full relative">
          {title} Items
          <span className="block w-20 h-1 bg-blue-500 mt-2 mx-auto rounded"></span>
        </h2>
        <div className="absolute top-6 right-8">
          <SearchIcon className="text-gray-700 cursor-pointer hover:text-black" />
          <input
            type="text"
            placeholder="Search by Name"
            className="p-2 border border-gray-300 rounded-md shadow-md bg-white w-60 mb-1"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            autoFocus
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {paginatedProducts.map((item, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-300 rounded-lg shadow p-4 flex flex-col justify-between items-center h-full"
          >
            <div
  className="absolute top-3 right-3 text-xl cursor-pointer"
  onClick={() => toggleWishlist(item)}
  title={wishlist.includes(item._id) ? "Remove from Wishlist" : "Add to Wishlist"}
>
  {wishlist.includes(item._id) ? (
    <AiFillHeart className="text-red" />
  ) : (
    <AiOutlineHeart className="text-gray-500" />
  )}
</div>
            <Image
              src={item.image}
              alt={item.name}
              className="h-[200px] mt-1 w-full object-cover rounded-md"
            />
            <p
              className="text-lg font-semibold text-blue-600 hover:underline mt-1 text-center cursor-pointer"
              onClick={() =>
                router.push(
                  `/item-details?name=${encodeURIComponent(item.name)}&price=${item.price}&image=${encodeURIComponent(item.image)}&_id=${item._id}&rating=${item.rating || 0}`
                )
              }
            >
              {item.name}
            </p>
            <Rating
              value={item.rating || 0}
              readOnly
              style={{ marginTop: "0.5rem" }}
            />
            <p className="text-xl font-bold text-gray-900 mt-1">
              ₹{item.price}
            </p>
           <button
  onClick={() => {
    dispatch(
      addItemToCart({
        id: item._id,
        title: item.name,
        price: item.price,
        discountedPrice: item.price, // Update if you apply discounts
        quantity: 1,
        imgs: {
          previews: [item.image],
          thumbnails: [],
        },
      })
    );
    toast.success("Item added to cart!");
  }}
  className="text-l inline-flex font-semibold text-white bg-dark py-[8px] px-9 rounded-md hover:bg-teal-dark mt-3"
>
  Add To Cart
</button>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center w-full text-gray-500">No results found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="flex justify-center items-center mt-10 space-x-2 text-sm font-medium">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-2 rounded-md border transition-all ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 border-gray-300"
      }`}
    >
      ← Prev
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-3 py-2 rounded-md border ${
          currentPage === page
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
        }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-2 rounded-md border transition-all ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 border-gray-300"
      }`}
    >
      Next →
    </button>
  </div>
)}
    </div>
  );
}
