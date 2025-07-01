import { getReviewData } from "@/services/auth-verificationService";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast'

const ReviewVerification = () => {
    const [reviewData, setReviewData] = useState<any>({});

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await getReviewData();
                setReviewData(data);
            } catch (error: any) {
                const message = error.response?.data?.message || error.message || 'Not able to send OTP'
                toast.error(message)
            } finally {
                // setLoading(false);
            }
        };

        fetchReview();
    }, []);

    return (
        <>
            <div className="xl:w-[70%] w-full xl:h-full flex justify-start items-center px-5">
                <div className="w-full h-full flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-5 text-[#171717]">
                        Your Application is Under Review
                    </h2>

                    <p className="text-[16px] leading-[25px] font-normal text-center text-[#0A0A0A] mb-5">
                        We’re currently assessing your profile and financial details. You’ll be notified once your loan eligibility is confirmed.
                    </p>

                    <p className="text-[16px] leading-[25px] font-normal text-center text-[#0A0A0A] mb-5">
                        Expected processing time: <span className="font-semibold">{reviewData.processing_time}.</span>
                    </p>

                    <div className="w-full bg-white px-4 lg:px-20 py-4 shadow-sm rounded-[2px] text-[20px] mb-5">
                        <div className="flex justify-between items-center mb-3">
                            <h3>Amount applied</h3>
                            <p className="font-semibold">{reviewData.amount}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3>Tenure of loan</h3>
                            <p className="font-semibold">{reviewData.tenure}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewVerification;

