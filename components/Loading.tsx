"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the type for the image object
interface LoadingImage {
  src: string;
  alt: string;
}

// Customizable array of images
const loadingImages: LoadingImage[] = [
  { src: "/imgs/abalone.svg", alt: "전복" },
  { src: "/imgs/default.png", alt: "Mulhoe" },
  { src: "/imgs/squid.svg", alt: "오징어" },
  { src: "/imgs/start.svg", alt: "물회" },
  { src: "/imgs/start2.png", alt: "Mulhoe" },
];

export default function LoadingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === loadingImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 200); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-[100svh] flex items-center justify-center bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6]">
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex} // Key changes to trigger animation
            src={loadingImages[currentImageIndex].src}
            alt={loadingImages[currentImageIndex].alt}
            className="w-64 h-64 object-contain rounded-lg shadow-lg"
          />
        </AnimatePresence>
        <span className="text-2xl font-bold text-white text-center">당신의 물회 취향은?</span>
      </div>
    </div>
  );
}