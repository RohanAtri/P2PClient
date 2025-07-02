'use client'
import Image from "next/image";
import { useState } from "react";
import { GoChevronRight } from "react-icons/go";

export default function LenderStartJourney() {
const [amount, setAmount] = useState("");

const handleAmtChange = (value: string) => {
        if (/^\d{0,15}$/.test(value)) {
            setAmount(value);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(amount)
    }

    const isFormValid = amount.length > 0

    return (
        <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex items-center justify-center bg-[#fff]">
            <div className="w-full h-full xl:w-[80%] xl:h-[85%] bg-primaryGray flex justify-center items-center">
                <div className='hidden md:block md:w-[35%] h-full'>
                    <Image
                        src="/lenderJourney.svg"
                        alt="Loan Visual"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover p-2"
                        priority
                    />
                </div>
                <div className='w-full md:w-[65%] h-full flex flex-col justify-center items-center p-6 sm:p-8 md:px-10 md:py-14'>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[400px]">
                        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5 sm:mb-6 text-[#171717]">
                            Start your lending journey
                        </h2>
                         <div className="mb-5 sm:mb-5">
                            <label className="block text-sm sm:text-[14px] font-medium text-[#0A0A0A] mb-1">
                                How much amount you want to lender <span className="text-red-500">*</span>
                            </label>
                            <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => handleAmtChange(e.target.value)}
                                    placeholder="Enter Amount"
                                    className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                />
                        </div>
                        <div className="mt-5 flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`relative flex items-center px-4 sm:px-6 py-1 sm:py-2 text-white rounded-[2px]  ease-in-out text-sm sm:text-base'
                                    
                                    before:content-[''] before:absolute before:inset-0 before:rounded-[3px] before:border
                                    before:-z-10 before:translate-y-[3px] before:translate-x-[3px] 
                                    z-10

                                    ${isFormValid
                                        ? 'bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer before:border-[#737373]'
                                        : 'bg-[#A3A3A3] cursor-not-allowed before:border-[#A3A3A3]'}
                            }`}
                            >
                                Submit <GoChevronRight className="ml-2 text-[#fff] text-xl" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}