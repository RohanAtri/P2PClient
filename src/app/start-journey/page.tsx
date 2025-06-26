"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { encryptByKeyV2 } from '@/lib/utils/crypto';
import { removeComma } from "@/lib/utils/format";
import Image from "next/image";

export default function StartJourney() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [primaryQuestions, setPrimaryQuestions] = useState<any[]>([]);
    const [loanAmount, setLoanAmount] = useState(0);
    const [tenure, setTenure] = useState(0);

    const [selectPurpose, setPurpose] = useState("");

    const [minLoan, setMinLoan] = useState(0);
    const [maxLoan, setMaxLoan] = useState(0);
    const [stepLoan, setStepLoan] = useState(10000);

    const [minTenure, setMinTenure] = useState(0);
    const [maxTenure, setMaxTenure] = useState(0);
    const [stepTenure, setStepTenure] = useState(1);

    useEffect(() => {
        const start = async () => {
            const clientId = `${process.env.NEXT_PUBLIC_CLIENT_ID}`;
            const clientSecret = `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`;
            const authCode = `${process.env.NEXT_PUBLIC_AUTH_CODE}`;

            const encryptionKey = `${process.env.NEXT_PUBLIC_ENCRYPION_KEY}`; // Must be 32 characters (256 bits)

            const encryptedClientId = await encryptByKeyV2(clientId, encryptionKey);
            const encryptedClientSecret = await encryptByKeyV2(clientSecret, encryptionKey);

            const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}customers-auth/primary-screening-questions`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'clientid': encryptedClientId,
                        'clientsecret': encryptedClientSecret,
                        'authcode': authCode
                    },
                });

                const data = await response.json();
                if (data.status == 200) {
                    const questions = data.data.resData;
                    setPrimaryQuestions(questions);
                    setLoanAmountFunction(questions);
                    setTenureFunction(questions);
                } else {
                    console.error('API Error:', 'Not able to fetch primary questions');
                }
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setLoading(false);
            }
        };

        start();
    }, []);

    function setLoanAmountFunction(questions: any[]) {
        const min = removeComma(questions[0]?.answers?.min);
        const max = removeComma(questions[0]?.answers?.max);

        setMinLoan(min);
        setMaxLoan(max);
        setStepLoan(10000);
        setLoanAmount(min);
    }

    function setTenureFunction(questions: any[]) {
        const min = Number(questions[1]?.answers?.min);
        const max = Number(questions[1]?.answers?.max);

        setMinTenure(min);
        setMaxTenure(max);
        setStepTenure(1);
        setTenure(min);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedPurposeAnswer = primaryQuestions[2]?.answers?.find(
            (ans: any) => ans.value === Number(selectPurpose)
        );

        const questions = [
            {
                question_id: primaryQuestions[0]?.q_id,
                answer: loanAmount,
            },
            {
                question_id: primaryQuestions[1]?.q_id,
                answer: tenure,
            },
            {
                question_id: primaryQuestions[2]?.q_id,
                answer_id: Number(selectPurpose),
                answer: selectedPurposeAnswer?.key || "",
            },
        ];

        localStorage.setItem("questions", JSON.stringify(questions));
        router.push("/verification");
    };

    return (
        <div className="w-full min-h-[calc(100vh-65px)] md:min-h-[calc(100vh-85px)] flex items-center justify-center bg-[#F8F7F4] px-4 py-8 sm:px-6 sm:py-10">
            <div className='w-full max-w-6xl h-auto md:h-[75vh] bg-[#EFEDE5] flex flex-col md:flex-row'>
                {/* Image Section - Hidden on mobile, shown on md+ */}
                <div className='hidden md:block md:w-[35%] h-full'>
                    <Image
                        src="/startJourney.svg"
                        alt="Loan Visual"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover p-2"
                        priority
                    />
                </div>
                
                {/* Form Section */}
                <div className='w-full md:w-[65%] h-full flex flex-col p-6 sm:p-8 md:px-10 md:py-14'>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-[#171717]">
                            Start your loan journey
                        </h2>

                        {/* Loan Amount Slider */}
                        <div className="mb-4 sm:mb-5">
                            <label className="block text-sm sm:text-[14px] font-medium text-[#171717] mb-1">
                                Please enter the amount of loan you are looking to get <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full group">
                                <div
                                    className="absolute -top-7 sm:-top-8 z-10 flex items-center justify-center w-18 h-6 sm:h-8 rounded-full bg-[#957E61] text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 sm:px-3"
                                    style={{
                                        left: `${((loanAmount - removeComma(primaryQuestions[0]?.answers?.min)) /
                                            (removeComma(primaryQuestions[0]?.answers?.max) - removeComma(primaryQuestions[0]?.answers?.min))) * 100}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    ₹{loanAmount.toLocaleString("en-IN")}
                                </div>

                                <input
                                    type="range"
                                    min={minLoan}
                                    max={maxLoan}
                                    step={10000}
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="custom-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div className="flex justify-between text-xs sm:text-[16px] text-[#000000] mt-1 px-1">
                                <span>₹{minLoan.toLocaleString("en-IN")}</span>
                                <span>
                                    ₹ {(Math.round(((removeComma(minLoan) + removeComma(maxLoan)) / 2) / stepLoan) * stepLoan).toLocaleString("en-IN")}
                                </span>
                                <span>₹{maxLoan.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        {/* Tenure Slider */}
                        <div className="mb-4 sm:mb-5">
                            <label className="block text-sm sm:text-[14px] font-medium text-[#171717] mb-1">
                                Please enter a tenure required to repay the loan <span className="text-red-500">*</span>
                            </label>

                            <div className="relative w-full group">
                                <div
                                    className="absolute -top-7 sm:-top-8 z-10 flex items-center justify-center w-14 h-6 rounded-full bg-[#957E61] text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    style={{
                                        left: `${((tenure - primaryQuestions[1]?.answers?.min) / (primaryQuestions[1]?.answers?.max - primaryQuestions[1]?.answers?.min)) * 100}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    {tenure} M
                                </div>

                                <input
                                    type="range"
                                    min={minTenure}
                                    max={maxTenure}
                                    step={1}
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="custom-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div className="flex justify-between text-xs sm:text-[16px] text-[#000000] mt-1 px-1">
                                <span>{minTenure} M</span>
                                <span>{(Math.round((minTenure + maxTenure) / 2))} M</span>
                                <span>{maxTenure} M</span>
                            </div>
                        </div>

                        {/* Loan Purpose Select */}
                        <div className="mb-4 sm:mb-5">
                            <label className="block text-sm sm:text-[14px] font-medium text-[#0A0A0A] mb-1">
                                Purpose of Loan <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="loanPurpose"
                                required
                                value={selectPurpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className="w-full bg-white rounded-none outline-none border border-[#A3A3A3] text-[#A3A3A3] p-2 sm:p-3 text-sm sm:text-base"
                            >
                                <option value="">Select Purpose</option>
                                {primaryQuestions[2]?.answers?.map((answer: any) => (
                                    <option key={answer.key} value={answer.value}>
                                        {answer.key}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="mb-5 flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={!selectPurpose}
                                className={`px-4 sm:px-6 py-1 sm:py-2 text-white rounded-[2px] transition duration-300 ease-in-out text-sm sm:text-base ${
                                    selectPurpose
                                        ? 'bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer'
                                        : 'bg-[#A3A3A3] cursor-not-allowed'
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
