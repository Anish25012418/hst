"use client";
// Defaults
import React from "react";
import Image from "next/image";
import { getApiImg } from "@/utils/methods/img-methods";

const ImageModal = ({ isOpen, selectedImage, closeModal }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-white bg-black/50 hover:bg-black px-2 py-1"
        >
          Close
        </button>
        <Image
          src={getApiImg(selectedImage)}
          alt="Selected Image"
          className="max-w-full max-h-full"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
};

export default ImageModal;
