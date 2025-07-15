'use client';
import React from "react";

const Footer = () => {

  return (
    <>
      <nav className="w-full bg-foreground text-white py-3 md:py-5 px-4 sm:px-6 md:px-8 lg:px-[140px] flex justify-between items-center border-b-[1px] border-[#41423F]">
        <img
          src="/icon.svg"
          alt="Lender Icon"
          className="h-8 w-8 md:h-12 md:w-12"
        />
      </nav>
    </>
  );
};

export default Footer;