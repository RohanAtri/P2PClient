import React from "react";


const Header = () => {
  return (
    <>
    <nav className="w-full h-[65px] md:h-[85px] bg-black text-white py-3 md:py-5 px-4 sm:px-6 md:px-8 lg:px-[140px] flex justify-between items-center">
      <img 
        src="/icon.svg" 
        alt="Lender Icon" 
        className="h-8 w-8 md:h-12 md:w-12" 
      />
      {/* <ul className="flex items-center space-x-6">
        <li><Link href="#">Blog</Link></li>
        <li><Link href="#">About Us</Link></li>
        <li><Link href="#">Support</Link></li>
        <li className="flex gap-[10px]">
            <button className="bg-[#737373] text-white px-4 py-1 rounded-[2px]">Login</button>
            <button className="bg-white text-black px-4 py-1 rounded-[2px]">Register</button>
        </li>
      </ul> */}
    </nav>
    </>
  );
};

export default Header;