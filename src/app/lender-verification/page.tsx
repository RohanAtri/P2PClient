'use client'

import BankTwoVerification from "@/components/BankTwoVerification";
import LenderBankVerification from "@/components/LenderBankVerification";
import LenderMobileVerification from "@/components/LenderMobileVerification";
import PanTwoVerification from "@/components/PanTwoVerification";
import ReviewTwoVerification from "@/components/ReviewTwoVerification";
import { useState } from "react";

export default function LenderVerification() {
    const [step, setStep] = useState(1);
    const stepLabels = [
        "Create Account",
        "KYC Verification",
        "Sign Agreement",
        // "Bank statement",
        "Start Lending",
    ];


    const getCircleStyle = (circleNum: number) => {
        // if (circleNum > step) return "bg-white text-[#957E61] ring-white";
        // if (circleNum === step) return "bg-white text-black ring-black";
        // if (circleNum < step) return "bg-black text-white ring-black";

        // return "bg-white text-[#957E61] ring-white";
    };

    const getLineStyle = (lineIndex: number) => {
        //return lineIndex < step - 1 ? "border-black" : "border-white";
    };
    const getLineHeightClass = (stepCount: number): string => {
        switch (stepCount) {
            case 3:
                return "h-22";
            case 4:
                return "h-16";
            case 5:
                return "h-10";
            case 6:
                return "h-8";
            default:
                return "h-[6rem]"; // fallback height
        }
    };

    return (
        <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex items-center justify-center bg-[#fff]">
            <div className="w-full h-full xl:w-[80%] xl:h-[85%] bg-[#F9F7E8] flex flex-col lg:flex-row shadow-md">
                {/* Sidebar (stacked on mobile/tablet, 40% width on large) */}
                <div className="w-full lg:w-[35%] flex justify-center items-center bg-[linear-gradient(to_bottom,_#22443D,_#162F2D)] p-4">
                    <div className="lg:w-[60%] w-full lg:h-[70%]">
                        <div className="w-full h-full md:py-10 py-4 px-2">
                            <ol className="relative md:pl-6 flex lg:flex-col justify-between h-full">
                                {stepLabels.map((label, idx) => {
                                    const circleNum = idx + 1;
                                    return (
                                        <li
                                            key={idx}
                                            className="relative flex flex-col lg:flex-row items-center w-full mb-4 md:mb-0"
                                        >
                                            <div
                                                className={`z-10 flex items-center justify-center w-10 h-10 rounded-full font-semibold bg-[#162F2D] text-[#fff] ${getCircleStyle(
                                                    circleNum
                                                )}`}
                                            >
                                                {circleNum}
                                            </div>

                                            {idx !== stepLabels.length - 1 && (
                                                <div
                                                    className={`absolute hidden lg:block left-[18px] top-8 border-l-2 ${getLineStyle(
                                                        idx
                                                    )} ${getLineHeightClass(stepLabels.length)}`}
                                                ></div>
                                            )}

                                            <span className="md:ml-4 mt-2 md:mt-0 text-white font-medium text-[15px]  text-center md:text-left">
                                                {label}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ol>

                        </div>
                    </div>
                </div>

                {/* Main content (stacked below sidebar on mobile/tablet) */}
                <div className="w-full lg:w-[65%] h-full px-4 py-6 lg:p-10 overflow-y-auto">
                      {/* <LenderMobileVerification />   */}
                      {/* <LenderBankVerification /> */}
                      {/* <PanTwoVerification onVerified={() => setStep(3)}/> */}
                      {/* <BankTwoVerification /> */}
                      <ReviewTwoVerification />
                </div>
            </div>
        </div>

    )
}