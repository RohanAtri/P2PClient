'use client'
import React, { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'


type Props = {}

export default function Dashboard() {
  const min = 10000;
  const max = 500000;
  const [value, setValue] = useState(min);

  const handleChange = (e:any) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };
  
  return (
    <ProtectedRoute>
      <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex bg-[#F8F7F4] text-[#000]">
      {/* Sidebar */}
      <aside className="w-[250px] bg-white shadow-md p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold">J</span>
          </div>
          <span className="font-medium text-lg">John</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm">
          <a href="#" className="text-[#777]">Dashboard</a>
          <a href="#" className="text-[#777]">Offers</a>
          <a href="#" className="text-[#777]">Notification</a>
          <a href="#" className="text-[#777]">Policies & Agreements</a>
          <a href="#" className="text-[#777]">Help & Support</a>
          <a href="#" className="text-[#777]">Profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Hello John, you have been sanctioned a loan of Rs 1,00,000
        </h1>

        {/* Slider & Amount */}
        <div className="bg-[#E9E1D2] p-6 rounded mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Select Amount</span>
            <span className="text-sm font-medium">12% p.a.</span>
          </div>
          <div className="text-2xl font-bold mb-2">₹1,00,000</div>
          <input type="range" min="10000" max="500000" onChange={handleChange}
            className="custom-range w-full"/>
          <div className="flex justify-between text-sm mt-1">
            <span>Rs 10,000</span>
            <span>Rs 5,00,000</span>
          </div>
        </div>

        {/* Loan Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {[
            { duration: "3 Months", active: true },
            { duration: "6 Months" },
            { duration: "9 Months" },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-md shadow-md p-6 ${plan.active ? "bg-[#5C4431] text-white" : "bg-white text-black"}`}
            >
              <h2 className="text-center font-semibold mb-2">{plan.duration}</h2>
              <hr className={`mb-4 ${plan.active ? "border-white" : "border-black"}`} />
              <div className="space-y-2 bg-white p-4 rounded text-black text-sm">
                <div className="flex justify-between">
                  <span>Interest Rate</span>
                  <span>12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount</span>
                  <span className="font-semibold">Rs 1,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>EMI amount</span>
                  <span className="font-semibold">Rs 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest</span>
                  <span className="font-semibold">Rs 5000</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="bg-black text-white px-6 py-2 rounded shadow hover:bg-[#1c1c1c]">
            Sign the Agreement →
          </button>
        </div>
      </main>
    </div>
    </ProtectedRoute>
    
  )
}