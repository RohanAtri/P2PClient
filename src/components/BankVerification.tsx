import React, { useEffect, useState } from "react";

const BankVerification = () => {

    const [bankList, setBanks] = useState([]);
    const [selectedBankCode, setSelectedBankCode] = useState("");

    const banks = [
        { name: 'HDFC Bank', logo: '/banklogo/HDFC.svg' },
        { name: 'ICICI Bank', logo: '/banklogo/ICICI.svg' },
        { name: 'State bank of India', logo: '/banklogo/SBI.svg' },
        { name: 'IDFC First Bank', logo: '/banklogo/IDFC.svg' },
        { name: 'HSBC Bank', logo: '/banklogo/HSBC.svg' },
        { name: 'Union Bank', logo: '/banklogo/Union.svg' },
    ];

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}customers/bank-list`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.status === 200) {
                    setBanks(data.data.bank_list);
                } else {
                    console.error("Failed to fetch banks:", data.message);
                }
            } catch (error) {
                console.error("Error fetching banks:", error);
            }
        };

        fetchBanks();
    }, []);

    const handleContinue = async () => {
        if (!selectedBankCode) {
            alert("Please select a bank");
            return;
        }

        const accessToken = localStorage.getItem("access_token");
        const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}customers/bank-statement?bank_code=${selectedBankCode}`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.status === 200) {
                const redirectUrl = data.data.url;

                if (redirectUrl) {
                    window.location.href = redirectUrl; // ✅ Full redirect outside your app
                    // OR router.push(redirectUrl); // ✅ use this if the URL is within your Next.js routes
                }

            } else {
                alert(data.message || "Bank verification failed.");
            }
        } catch (error) {
            console.error("Bank verification error:", error);
            alert("Something went wrong.");
        }
    };



    return (
        <>
            <div className="xl:w-[80%] w-full xl:h-full flex justify-start items-center px-0 sm:px-10">
                <div className="w-full h-full flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-[#171717]">
                        Add your Primary Bank Account
                    </h2>

                    <p className="text-base sm:text-lg leading-6 text-center text-[#0A0A0A] mb-4">
                        Please provide details of your bank account in which Salary/Income gets credited to get higher loan offers
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-2 py-2 bg-[#f9f8f4] mb-4">
                        {banks.map((bank) => (
                            <div
                                key={bank.name}
                                className="flex flex-col items-center justify-center p-3 bg-[#f3f2ee] rounded-[2px] shadow-sm hover:shadow-md transition"
                            >
                                <img src={bank.logo} alt={bank.name} className="w-14 h-14 mb-2 object-contain" />
                                <p className="text-center text-[#212120] text-[13px]">{bank.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mb-4">
                        <select className="w-full border border=[#171717] p-3 outline-none rounded-[2px]"
                            value={selectedBankCode}
                            onChange={(e) => setSelectedBankCode(e.target.value)}>
                            <option value="">Choose a Bank</option>
                            {bankList.map((bank: any) => (
                                <option key={bank.name} value={bank.id}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 flex justify-center">
                        <label htmlFor="terms" className="text-sm text-[#171717]">
                            Unable to find your bank? reach out to our
                            <a href="#" className="font-thin underline ml-1 text-[#4C8BF5]">support team </a>
                            to help you further
                        </label>
                    </div>

                    <div className="mt-5 flex justify-center items-center">
                        <button
                            type="button"
                            onClick={handleContinue}
                            disabled={!selectedBankCode}
                            className={`px-6 py-2 text-white rounded-[2px] transition duration-300 ease-in-out ${selectedBankCode
                                    ? 'bg-[#737373] hover:bg-[#5e5e5e] cursor-pointer'
                                    : 'bg-[#A3A3A3] cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankVerification;