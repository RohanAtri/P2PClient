import { useState } from "react";

const LenderBankVerification = () => {
    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIFSCCode] = useState("");

     const isFormValid =
        accountNumber.trim().length > 0 &&
        ifscCode.trim().length > 0;

        const handleSubmit = (e: React.FormEvent) => {
            
        }

 return (
        <>
            {!showOtpScreen ? (
                            <div className="w-full h-full flex flex-col md:justify-center items-center">
                                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                                    <h2 className="sm:text-3xl text-2xl font-semibold text-center mb-4 text-[#171717]">
                                        Add your Primary Bank Account 
                                    </h2>

                                    <p className="sm:text-md text-sm text-center mb-4 text-[#171717]">
                                        Add and Verify Bank account to lend money 
                                    </p>
            
                                    <div className="mb-5 max-w-[450px] w-full">
                                        <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                            Bank Account Number <span className="text-red-500">*</span>
                                        </label>
            
                                        <input
                                            type="text"
                                            placeholder="Enter your bank account number"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                        />
                                    </div>
                                    <div className="mb-5 max-w-[450px] w-full">
                                        <label className="block text-sm font-medium text-black mb-2">
                                            IFSC Code <span className="text-red-600">*</span>
                                        </label>
            
                                        <input
                                            type="text"
                                            placeholder="Enter your bank IFSC code"
                                            value={ifscCode}
                                            onChange={(e) => setIFSCCode(e.target.value)}
                                            className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                        />
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
                                            Link Account
                                        </button>
                                    </div>
                                </form>
            
            
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center px-5 md:px-12">
                                {/* <div className="max-w-[300px]">
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
                                </div> */}
                            </div>
                        )}
        </>
 )
}

export default LenderBankVerification;