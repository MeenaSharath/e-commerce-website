"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Navigate to /single-cat-items with query params
    const params = new URLSearchParams({
      plink: option.plink,
      title: option.label,
    }).toString();

    router.push(`/single-cat-items?${params}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[250px] ms-5" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md transition"
      >
        <span>{selectedOption.label}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
        key={index}
        onClick={() => handleOptionClick(option)}
        className='px-4 py-2 cursor-pointer hover:bg-gray'
      >

              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
