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

const ITEMS_PER_PAGE = 6;

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
    <div className="min-h-screen bg-[#F5F5F7] px-6 sm:px-10 lg:px-20 py-6">
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
      {title} Items
      <span className="block w-20 h-1 bg-blue-500 mt-2 rounded"></span>
    </h2>
    
    <div className="relative w-full md:w-80">
      <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search by Name"
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>
  </div>

  {/* Product Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {paginatedProducts.map((item, index) => (
      <div key={index} className="bg-white border rounded-lg shadow p-4 relative text-center">
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
          width={600}
          height={400}
          src={item.image}
          alt={item.name}
          className="h-[200px] w-full object-cover rounded-md"
        />

        <p
          className="text-lg font-semibold text-blue-600 hover:underline mt-2 text-center cursor-pointer"
          onClick={() =>
            router.push(
              `/item-details?name=${encodeURIComponent(item.name)}&price=${item.price}&image=${encodeURIComponent(item.image)}&_id=${item._id}&rating=${item.rating || 0}`
            )
          }
        >
          {item.name}
        </p>

        <Rating value={item.rating || 0} readOnly className="mt-1" />
        <p className="text-xl font-bold text-gray-900 mt-1">₹{item.price}</p>

        <button
          onClick={() => {
            dispatch(
              addItemToCart({
                id: item._id,
                title: item.name,
                price: item.price,
                discountedPrice: item.price,
                quantity: 1,
                imgs: {
                  previews: [item.image],
                  thumbnails: [],
                },
              })
            );
            toast.success("Item added to cart!");
          }}
          className="mt-3 bg-dark text-white font-medium py-2 px-5 rounded-md"
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
