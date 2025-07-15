'use client';
import { useSidebarToggle } from '../components/SidebarToggleContext';
import Image from 'next/image';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { GoDatabase } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import { BsDatabaseAdd } from "react-icons/bs";
import { TfiLoop } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Footer from '@/components/Footer';

export default function DashboardPage() {
    const { toggleSidebar } = useSidebarToggle();
    const progress = Math.min((5 / 25) * 100, 100);


    return (
        <>
            <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] relative overflow-y-auto hide-scrollbar bg-[#F9F9F9]">
                <div className='flex justify-center'>
                    <div className="absolute top-0 left-0 w-full h-[28%] bg-[#292928] z-0" />

                    <div className="w-[70%] relative z-10 py-10">
                        <div className='mb-8'>
                            <div className='flex justify-between text-white mb-10'>
                                <div className='flex gap-3'>
                                    <Image src="/Profile.png" alt="" width={40} height={30} className=" rounded-full object-cover border border-[#FFFFFF]" />
                                    <h1 className='text-3xl font-semibold'>Hello Saish Mankane</h1>
                                </div>
                                <div className='flex gap-2'>
                                    <IoIosNotificationsOutline className='text-2xl cursor-pointer' />
                                    <IoIosMenu onClick={toggleSidebar} className='text-2xl cursor-pointer' />
                                </div>
                            </div>
                            <div className='bg-[#FFFFFF] border border-[#F1F0EC] p-4'>
                                <div className='flex justify-between pb-4'>
                                    <h1 className='text-2xl font-semibold'>Loan Details</h1>
                                    <span className='bg-[#F3EEE8] px-2 py-1'>Loan ID: 234789</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-4'>
                                        <div className='bg-[#E6F2F9] px-2 h-12 w-12 flex items-center justify-center'>
                                            <GoDatabase size={26} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h4 className='text-[#61625E]'>Loan Disbursed</h4>
                                            <p className='font-semibold'> {'\u20B9'}3,00,000</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className='bg-[#E6F2F9] px-2 h-12 w-12 flex items-center justify-center'>
                                            <GoDatabase size={26} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h4 className='text-[#61625E]'>Loan Tenure</h4>
                                            <p className='font-semibold'>36 Months</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className='bg-[#E6F2F9] px-2 h-12 w-12 flex items-center justify-center'>
                                            <GoDatabase size={26} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h4 className='text-[#61625E]'>Outstanding loan (Principal + Interest)</h4>
                                            <p className='font-semibold'> {'\u20B9'}4,00,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#FFFFFF] border border-[#F1F0EC] p-4 mb-8 rounded-[4px]'>
                            <div className='flex justify-between mb-6'>
                                <h1 className='text-2xl font-semibold'>5 of 25 EMIs Paid</h1>
                                <span className='bg-[#C00F0C] px-2 py-1 text-white flex items-center gap-2 font-semibold rounded-[4px]'> <IoWarningOutline size={20} />                        Due in 6 Days</span>
                            </div>
                            <div className="relative w-full h-2 bg-[#E5E5E5] rounded mb-6">
                                <div
                                    className="absolute top-0 left-0 h-2 bg-[#41423F] rounded"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className='flex gap-4 mb-4'>
                                <div className='bg-[#E6F2F9] px-2 h-12 w-12 flex items-center justify-center'>
                                    <BsDatabaseAdd size={24} />
                                </div>
                                <div className='flex flex-col'>
                                    <h4>EMI Amount</h4>
                                    <p className='font-semibold'> {'\u20B9'}4,500</p>
                                </div>
                            </div>
                            <div className='flex gap-4 mb-4'>
                                <div className='bg-[#E6F2F9] px-2 h-12 w-12 flex items-center justify-center'>
                                    <TfiLoop size={24} />
                                </div>
                                <div className='flex flex-col'>
                                    <h4>Next EMI Date</h4>
                                    <p className='font-semibold'>24/07/25</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mb-4'>
                                <button className="relative inline-block px-6 py-2 text-white font-semibold bg-[#171717] rounded-[2px]">
                                    <span className="absolute -bottom-1 -right-1 w-full h-full border border-[#171717] rounded-[2px] z-[1]"></span>
                                    Pay EMI Now
                                </button>

                                <button className="relative inline-block px-6 py-2 text-black font-semibold bg-[#F9F9F9] border border-[#737373] rounded-[2px]">
                                    <span className="absolute -bottom-1 -right-1 w-full h-full border-b border-r border-[#737373] rounded-[4px] z-[1]"></span>
                                    Pay Custom Amount
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-between items-center bg-[#DDEAE3] p-6 rounded-[4px] shadow-md mb-8'>
                            <div className='flex items-center gap-4'>
                                <Image src="/viewStatement.svg" alt="" width={60} height={60} />
                                <p className='text-xl font-semibold'>View your statement of accounts</p>
                            </div>
                            <button className="relative inline-block px-8 py-1 text-white font-semibold bg-[#345145] rounded-[2px]">
                                <span className="absolute -bottom-1 -right-1 w-full h-full border-b border-r border-[#292928] rounded-[4px] z-[1]"></span>
                                View Statement
                            </button>
                        </div>

                        <div className='mb-8'>
                            <h1 className='text-2xl font-semibold mb-4'>Upcoming EMI schedule</h1>
                            <div>
                                <table className="w-full border-collapse border border-[#D4D4D4]">
                                    <thead>
                                        <tr>
                                            <th className="border border-[#D4D4D4] bg-[#F5F5F5] py-6 px-2">#</th>
                                            <th className="border border-[#D4D4D4] bg-[#F5F5F5] py-6 px-2">Due Date</th>
                                            <th className="border border-[#D4D4D4] bg-[#F5F5F5] py-6 px-2">EMI Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">1</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">24/07/25</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">{'\u20B9'}4,500</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">2</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">24/07/25</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">{'\u20B9'}4,500</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">3</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">24/07/25</td>
                                            <td className="border border-[#D4D4D4] text-center align-middle py-2 px-2">{'\u20B9'}4,500</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className='flex justify-between items-center bg-[#F9F7E8] p-6 rounded-[4px] shadow-md mb-8'>
                            <div className='flex items-center gap-4'>
                                <Image src="/applyLoan.svg" alt="" width={60} height={60} />
                                <div className='flex flex-col'>
                                    <p className='text-xl font-semibold'>Hey Saish, an additional loan of ₹20,000 is exclusively available for you</p>
                                    <p className='text-[#212120]'>You can get a second loan based on your profile, apply and get the loan at the best interest rates</p>
                                </div>

                            </div>
                            <button className="relative inline-block px-8 py-1 text-[#FFFFFF] font-semibold bg-[#292928] rounded-[2px]">
                                <span className="absolute -bottom-1 -right-1 w-full h-full border-b border-r border-[#292928] rounded-[4px] z-[1]"></span>
                                Apply Loan
                            </button>
                        </div>

                        <div className='mb-12'>
                            <h1 className='text-2xl font-semibold mb-4'>Help and Support</h1>
                            <div className='flex border border-[#F1F0EC] shadow-md p-6 mb-4'>
                                <div className='flex flex-col items-center justify-center w-[50%]'>
                                    <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center mb-4'>
                                        <IoCallOutline size={26} />
                                    </div>
                                    <p className='text-[#61625E]'>Contact Support</p>
                                    <p className='font-semibold'>96122 38213 / 97482 23289</p>
                                </div>
                                <div className='flex flex-col items-center justify-center w-[50%]'>
                                    <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center mb-4'>
                                        <MdOutlineEmail size={26} />
                                    </div>
                                    <p className='text-[#61625E]'>Contact email</p>
                                    <p className='font-semibold'>support.p2p@1finance.com</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                {/* Card 1 */}
                                <div className="flex items-center justify-between p-4 bg-white rounded shadow border border-[#F1F0EC]">
                                    <div className="flex items-center gap-4">
                                        <img src="/rateExp.svg" alt="Rate" className="w-10 h-10" />
                                        <div>
                                            <h2 className="font-semibold text-[#171717]">Rate your experience</h2>
                                            <p className="text-sm text-[#212120]">Rate our service</p>
                                        </div>
                                    </div>
                                    <MdArrowForwardIos className='cursor-pointer' />
                                </div>

                                {/* Card 2 */}
                                <div className="flex items-center justify-between p-4 bg-white rounded shadow border border-[#F1F0EC]">
                                    <div className="flex items-center gap-4">
                                        <img src="/FAQ.svg" alt="FAQ" className="w-10 h-10" />
                                        <div>
                                            <h2 className="font-semibold text-[#171717]">FAQ’s</h2>
                                            <p className="text-sm text-[#212120]">Get instant answers to your issues</p>
                                        </div>
                                    </div>
                                    <MdArrowForwardIos className='cursor-pointer' />
                                </div>

                                {/* Card 3 */}
                                <div className="flex items-center justify-between p-4 bg-white rounded shadow border border-[#F1F0EC]">
                                    <div className="flex items-center gap-4">
                                        <img src="/referral.svg" alt="Referral" className="w-10 h-10" />
                                        <div>
                                            <h2 className="font-semibold text-[#171717]">Referral Program</h2>
                                            <p className="text-sm text-[#212120]">Refer friends and earn rewards</p>
                                        </div>
                                    </div>
                                    <MdArrowForwardIos className='cursor-pointer' />
                                </div>

                                {/* Card 4 */}
                                <div className="flex items-center justify-between p-4 bg-white rounded shadow border border-[#F1F0EC]">
                                    <div className="flex items-center gap-4">
                                        <img src="/calculator.svg" alt="Calculator" className="w-10 h-10" />
                                        <div>
                                            <h2 className="font-semibold text-[#171717]">Calculators</h2>
                                            <p className="text-sm text-[#212120]">Calculate your loan eligibility, repayment</p>
                                        </div>
                                    </div>
                                    <MdArrowForwardIos className='cursor-pointer' />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>

    );
}
