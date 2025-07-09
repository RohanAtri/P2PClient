import { useLoaderStore } from "@/lib/store/useLoaderStore";
import { savePrimaryQuestion, sendOtptoUser, validateOtptoUser } from "@/services/auth-verificationService";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';

type MobileVerificationProps = {
    onVerified: () => void;
};

const MobileVerification = ({ onVerified }: MobileVerificationProps) => {
    const setLoading = useLoaderStore.getState().setLoading;
    const [requestBody, setRequestBody] = useState<{ mobile_number: string; name: string } | null>(null);
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(60);

    const [fullName, setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    useEffect(() => {
        if (showOtpScreen) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // cleanup on unmount
        }
    }, [showOtpScreen, timer]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            mobile_number: mobileNumber,
            name: fullName,
        };

        setRequestBody(payload);
        sendOTP(payload);

    };

    const sendOTP = async (bodyParam?: typeof requestBody) => {
        const bodyToSend = bodyParam || requestBody;
        try {
            setLoading(true);
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
            setLoading(false);
        }
    }

    const validateOtp = async () => {
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            alert("Please enter a valid 6-digit OTP.");
            return;
        }

        const body = {
            mobile_number: mobileNumber,
            otp: Number(otpValue),
            name: fullName,
            user_type: 2,
        };

        try {
            setLoading(true);
            const data = await validateOtptoUser(body)
            if (data.status == 200) {
                localStorage.setItem("access_token", data.data.tokens.access_token)
                localStorage.setItem("user_code",data.data.user_code)
                if (!data.data.old_user) {
                    loanInfoSubmit();
                }
                onVerified();
            } else {
                toast.error('Not able to validate OTP');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Not able to validate OTP'
            toast.error(message)
        } finally {
            setLoading(false);
        }
    }

    const loanInfoSubmit = async () => {
        const questionsData = JSON.parse(localStorage.getItem('questions') || '[]');

        const body = {
            questions: questionsData
        };

        try {
            setLoading(true);
            const data = await savePrimaryQuestion(body);
            if (data.status === 200) {
                localStorage.removeItem('questions')
            } else {
                toast.error('Failed to save primary questions');
            }
        } catch (error:any) {
            const message = error.response?.data?.message || error.message || 'Failed to save primary questions';
            toast.error(message)
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        fullName.trim().length > 0 &&
        mobileNumber.length === 10 &&
        acceptedTerms;

    const handleMobileChange = (value: string) => {
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
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

    return (
        <>
            <div className={`w-full xl:w-[70%] h-full flex items-center px-4 ${showOtpScreen ? 'justify-center' : ''
                }`}>
                {!showOtpScreen ? (
                    <div className="w-full h-full flex flex-col md:justify-center items-center">
                        <form onSubmit={handleSubmit} className="max-w-[520px]">
                            <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-6 text-[#171717]">
                                Enter your Name and Mobile Number
                            </h2>

                            <div className="mb-5">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    Enter name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name as per PAN card"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                />
                            </div>
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

                            <div className="flex items-center justify-center space-x-2 mb-5">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="w-4 h-4  text-white bg-black border-none rounded checked:bg-black checked:border-none"
                                />
                                <label htmlFor="terms" className="text-sm text-[#171717]">
                                    I have read the
                                    <a href="#" className="font-thin underline ml-1">Privacy Policy </a>
                                    and
                                    <a href="#" className="font-thin underline ml-1">Terms & Conditions</a>
                                </label>
                            </div>

                            <div className="mt-5 flex justify-center items-center">
                                <button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`px-6 py-2 rounded-[2px] transition duration-300 ease-in-out text-white ${isFormValid
                                        ? "bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer"
                                        : "bg-[#A3A3A3] cursor-not-allowed"
                                        }`}
                                >
                                    Continue
                                </button>
                            </div>
                        </form>


                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center max-w-[450px] px-5 md:px-12">
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
                )}

            </div>

        </>
    );
};

export default MobileVerification;