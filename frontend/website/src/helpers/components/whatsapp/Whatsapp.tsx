"use client";
// Deafaults
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { CustomTypography } from "@/helpers/components";

// Modal component
const Modal = ({ isOpen, onClose, onSelect }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (name: any) => {
    onSelect(name);
    onClose();
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-[99999]"
      onClick={onClose}
    >
      <div
        className={`bg-green-600 p-4 rounded shadow-md w-64 fixed bottom-[115px] right-[32px] transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex flex-col justify-start items-start p-2 w-full">
          <CustomTypography className=" text-white text-[14px] font-bold">
            Start a conversation
          </CustomTypography>
          <CustomTypography className="text-[9px] text-white">
            Click one of our member below to chat
          </CustomTypography>
        </div>
        <button
          className="w-full py-2 px-4 mb-2 bg-gray-100 text-black hover:bg-gray-200 flex flex-row items-center justify-start gap-2"
          onClick={() => handleSelect("Jenny")}
        >
          <FaWhatsapp color="green" className="w-3 h-3 md:w-6 md:h-6" />
          <CustomTypography>Jenny Caunt</CustomTypography>
        </button>
        <button
          className="w-full py-2 px-4 bg-gray-100 text-black hover:bg-gray-200 flex flex-row items-center justify-start gap-2"
          onClick={() => handleSelect("Santosh")}
        >
          <FaWhatsapp color="green" className="w-3 h-3 md:w-6 md:h-6" />
          <CustomTypography>Santosh Rai</CustomTypography>
        </button>
      </div>
    </div>
  );
};

// Main WhatsApp component
const Whatsapp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const router = useRouter();

  const handleClick = () => {
    // Open the modal when the WhatsApp button is clicked
    setModalOpen(true);
  };

  const handleSelect = (name: any) => {
    // Navigate to a URL with the selected name as a query parameter
    if (name === "Santosh") {
      window.open(
        `https://api.whatsapp.com/send?phone=9779851084801`,
        "_blank"
      );
    }

    if (name === "Jenny") {
      window.open(
        `https://api.whatsapp.com/send?phone=9779823100104`,
        "_blank"
      );
    }
  };

  return (
    <>
      <div
        className="bg-green-600 w-min p-3 rounded-full fixed 
          bottom-10 right-4 cursor-pointer md:right-8 z-[99999] hover:bg-green-500 shadow-md"
        onClick={handleClick}
      >
        <FaWhatsapp color="white" className="w-7 h-7 md:w-10 md:h-10" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
};

export default Whatsapp;
