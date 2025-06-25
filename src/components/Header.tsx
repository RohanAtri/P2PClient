import React from "react";
import Link from "next/link";


const Header = () => {
  return (
    <>
    <nav className="w-full h-[85px] bg-black text-white py-5 px-[140px] flex justify-between items-center">
         <img src="/icon.svg" alt="Lender Icon" className="h-12 w-12" />
      <ul className="flex items-center space-x-6">
        <li><Link href="#">Blog</Link></li>
        <li><Link href="#">About Us</Link></li>
        <li><Link href="#">Support</Link></li>
        <li className="flex gap-[10px]">
            <button className="bg-[#737373] text-white px-4 py-1 rounded-[2px]">Login</button>
            <button className="bg-white text-black px-4 py-1 rounded-[2px]">Register</button>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Header;