"use client";

import BankVerification from "@/components/BankVerification";
import MobileVerification from "@/components/MobileVerification";
import PanVerification from "@/components/PanVerification";
import ReviewVerification from "@/components/ReviewVerification";
import { useEffect, useState } from "react";

export default function Verification() {
    const [step, setStep] = useState(4);

    const stepLabels = [
        "Mobile verification",
        "PAN verification",
        "Add Bank account",
        // "Bank statement",
        "Review",
    ];

    const stageIdToStep: Record<number, number> = {
        2: 1, // MobileVerification
        3: 2, // PAN
        6: 3, // Bank
        4: 4, // Review
    };

    const getCircleStyle = (circleNum: number) => {
        if (circleNum > step) return "bg-white text-[#957E61] ring-white";
        if (circleNum === step) return "bg-white text-black ring-black";
        if (circleNum < step) return "bg-black text-white ring-black";

        return "bg-white text-[#957E61] ring-white";
    };

    const getLineStyle = (lineIndex: number) => {
        return lineIndex < step - 1 ? "border-black" : "border-white";
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

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}customers/status-tracker`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.status === 200) {
                    const currentStage: number = Number(data.data.current_stage);
                    if (currentStage === 0) {
                        setStep(1);
                    } else {
                        const step = stageIdToStep[currentStage] || 1;
                        setStep(step);
                    }
                } else {
                    console.error("Failed to fetch banks:", data.message);
                    setStep(1);
                }
            } catch (error) {
                console.error("Error fetching banks:", error);
                setStep(1);
            }
        };

        //fetchStatus();
    }, []);

    return (
        <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex flex-col md:flex-row items-center justify-center bg-[#F8F7F4] px-4 py-8 sm:px-6 sm:py-10">
            <div className="md:h-full w-full md:w-[40%] flex md:justify-end items-center">
                <div className="md:w-[60%] w-full md:h-[70%]">
                    <div className="w-full h-full md:py-10 py-4 px-2 bg-[#957E61]">
                        <ol className="relative md:pl-6 flex md:flex-col justify-between h-full">
                            {stepLabels.map((label, idx) => {
                                const circleNum = idx + 1;
                                return (
                                    <li
                                        key={idx}
                                        className="relative flex flex-col md:flex-row items-center w-full mb-4 md:mb-0"
                                    >
                                        <div
                                            className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ring-3 font-semibold text-[#000000] ${getCircleStyle(
                                                circleNum
                                            )}`}
                                        >
                                            {circleNum}
                                        </div>

                                        {idx !== stepLabels.length - 1 && (
                                            <div
                                                className={`absolute hidden md:block left-[15px] top-8 border-l-2 ${getLineStyle(
                                                    idx
                                                )} ${getLineHeightClass(stepLabels.length)}`}
                                            ></div>
                                        )}

                                        <span className="md:ml-4 mt-2 md:mt-0 text-white font-medium text-xs md:text-sm text-center md:text-left">
                                            {label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[60%] h-full px-4 py-6 md:p-10">
                {step === 1 && <MobileVerification onVerified={() => setStep(2)} />}
                {step === 2 && <PanVerification onVerified={() => setStep(3)} />}
                {step === 3 && <BankVerification />}
                {step === 4 && <ReviewVerification />}
            </div>
        </div>
    );
}