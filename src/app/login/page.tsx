'use client'
import { sendOtptoUser, validateOtptoUser } from '@/services/auth-verificationService';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

type Props = {}

export default function Dashboard() {
    const router = useRouter();
    const [requestBody, setRequestBody] = useState<{ mobile_number: string; name: null } | null>(null);
    const [mobileNumber, setMobileNumber] = useState("");
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(60);

    const handleMobileChange = (value: string) => {
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
    };

    const isFormValid = mobileNumber.length === 10

    const sendOtpFunc = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            mobile_number: mobileNumber,
            name: null,
        };

        setRequestBody(payload);
        sendOTP(payload);

    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[idx] = value;
            setOtp(newOtp);

            if (value && idx < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${idx + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace") {
            if (otp[idx] === "" && idx > 0) {
                e.preventDefault(); // ✅ prevent unintended delete of previous value
                const prevInput = document.getElementById(`otp-${idx - 1}`);
                prevInput?.focus();

                // Optional: clear previous value too
                const newOtp = [...otp];
                newOtp[idx - 1] = "";
                setOtp(newOtp);
            }
        }
    };

    const formatTimer = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(1, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const isOtpBtnEnable = () => {
        return otp.every((digit) => digit.trim() !== "") && otp.length === 6;
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split("");
            setOtp(newOtp);

            // Focus the last input
            const lastInput = document.getElementById(`otp-5`);
            lastInput?.focus();
        }
    };

    const sendOTP = async (bodyParam?: typeof requestBody) => {
        const bodyToSend = bodyParam || requestBody;
        try {
            const data = await sendOtptoUser(bodyToSend)
            if (data.status == 200) {
                setShowOtpScreen(true);
                setTimer(60);
            } else {
                toast.error('Not able to send OTP');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Not able to send OTP'
            toast.error(message)
        } finally {
            // setLoading(false);
        }
    }

    const validateOtp = async () => {
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        const body = {
            mobile_number: mobileNumber,
            otp: Number(otpValue),
            name: null,
            user_type: 2,
        };

        try {
            const data = await validateOtptoUser(body);
            if (data.status == 200) {
                localStorage.setItem("access_token", data.data.tokens.access_token)
                localStorage.setItem("user_code",data.data.user_code)
                if (data.data.old_user) {
                    router.push("/verification");
                }
            } else {
                toast.error('Not able to validate OTP');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Not able to validate OTP'
            toast.error(message)
        } finally {
            // setLoading(false);
        }
    };

    
    return (
        <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] flex items-center justify-center bg-[#fff]">
            <div className="w-full h-full md:w-[80%] md:h-[85%] bg-[#F9F7E8] flex justify-center items-center">
                {!showOtpScreen ? (
                    <form onSubmit={sendOtpFunc} className="max-w-[520px]">
                        <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-6 text-[#171717]">
                            Login
                        </h2>
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-black mb-2">
                                Enter mobile number <span className="text-red-600">*</span>
                            </label>

                            <div className="flex items-center border border-[#A3A3A3] rounded-[2px] px-3 py-2 bg-white w-full">
                                <div className="flex items-center gap-1 font-thin text-black whitespace-nowrap">
                                    <img src="/India.svg" alt="IN" className="w-5 h-4" />
                                    | +91
                                </div>

                                <span className="mx-2 text-gray-300">|</span>

                                <input
                                    type="tel"
                                    value={mobileNumber}
                                    onChange={(e) => handleMobileChange(e.target.value)}
                                    placeholder="Enter your mobile number"
                                    className="flex-1 outline-none border-none placeholder-[#A3A3A3] text-[#171717] bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center items-center">

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`
                            relative w-full px-6 py-2 flex items-center justify-center gap-2 text-white text-sm font-medium 
                            rounded-[3px] transition duration-300 ease-in-out

                            before:content-[''] before:absolute before:inset-0 before:rounded-[3px] before:border
                            before:-z-10 before:translate-y-[3px] before:translate-x-[3px]
                                
                            z-10

                            ${isFormValid
                                        ? 'bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer before:border-[#737373]'
                                        : 'bg-[#A3A3A3] cursor-not-allowed before:border-[#A3A3A3]'}
                            `}
                            >
                                <span className="relative z-10">Continue</span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="max-w-[520px]">
                        <h2 className="sm:text-3xl text-2xl font-bold text-gray-900 text-center mb-4 font-sans">
                            OTP Verification
                        </h2>

                        <p className="text-[16px] leading-[25px] font-normal text-center text-[#0A0A0A] mb-2">
                            Enter the 6-digit verification code sent to your phone number +91 {mobileNumber[0]}XXXX X{mobileNumber.slice(-4)}
                        </p>

                        <p className="text-[16px] leading-[25px] text-center text-[#0A0A0A] mb-5">
                            Entered a wrong phone number? <a href="#" className="text-[#4C8BF5] underline" onClick={(e) => {
                                e.preventDefault(); // prevent page jump
                                setShowOtpScreen(false); // switch back to form
                            }}>change here</a>
                        </p>

                        <div className="flex gap-3 justify-center mb-5">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    onPaste={(e) => handleOtpPaste(e)}
                                    id={`otp-${idx}`}
                                    className="text-center text-[#DEDDD9] border border-gray-300 text-3xl font-bold rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    style={{
                                        width: "40px",
                                        height: "60px",
                                        padding: "10px 0",
                                        WebkitTextSecurity: 'disc',
                                        lineHeight: "60px"
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>

                        <div className="mt-5 flex justify-center items-center mb-4">
                            <button
                                onClick={validateOtp}
                                type="button" disabled={!isOtpBtnEnable()}
                                className={`px-6 py-2 rounded-[2px] transition duration-300 ease-in-out text-white ${isOtpBtnEnable()
                                    ? "bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer"
                                    : "bg-[#A3A3A3] cursor-not-allowed"
                                    }`}
                            >
                                Verify OTP
                            </button>
                        </div>

                        <p className="text-[16px] leading-[25px] text-center text-[#0A0A0A]">
                            Didn't receive OTP?
                            {timer > 0 ? (
                                <span className="text-[#4C8BF5] ml-1 cursor-pointer" onClick={(e) => {
                                    e.preventDefault();
                                    sendOTP();
                                    setTimer(60); // restart timer
                                }}>Resend OTP ({formatTimer(timer)})</span>
                            ) : (
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    sendOTP();
                                    setTimer(60); // restart timer
                                }}
                                    className="text-[#4C8BF5] underline ml-1"
                                >
                                    Resend OTP
                                </a>
                            )}
                        </p>
                    </div>
                )
                }
            </div>
        </div>
    )
}