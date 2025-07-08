import { useState } from "react";

export default function DashboardContent() {

    const min = 10000;
    const max = 500000;
    const [value, setValue] = useState(min);

    const handleChange = (e: any) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">
                Hello John, you have been sanctioned a loan of Rs 1,00,000
            </h1>

            {/* Slider & Amount */}
            <div className="bg-[#E9E1D2] p-6 rounded mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Select Amount</span>
                    <span className="text-sm font-medium">12% p.a.</span>
                </div>
                <div className="text-2xl font-bold mb-2">₹1,00,000</div>
                <input type="range" min="10000" max="500000" onChange={handleChange}
                    className="custom-range w-full" />
                <div className="flex justify-between text-sm mt-1">
                    <span>Rs 10,000</span>
                    <span>Rs 5,00,000</span>
                </div>
            </div>

            {/* Loan Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {[
                    { duration: "3 Months", active: true },
                    { duration: "6 Months" },
                    { duration: "9 Months" },
                ].map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-md shadow-md p-6 ${plan.active ? "bg-[#5C4431] text-white" : "bg-white text-black"}`}
                    >
                        <h2 className="text-center font-semibold mb-2">{plan.duration}</h2>
                        <hr className={`mb-4 ${plan.active ? "border-white" : "border-black"}`} />
                        <div className="space-y-2 bg-white p-4 rounded text-black text-sm">
                            <div className="flex justify-between">
                                <span>Interest Rate</span>
                                <span>12%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Loan Amount</span>
                                <span className="font-semibold">Rs 1,00,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>EMI amount</span>
                                <span className="font-semibold">Rs 10,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Interest</span>
                                <span className="font-semibold">Rs 5000</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="text-center">
                <button className="bg-black text-white px-6 py-2 rounded shadow hover:bg-[#1c1c1c]">
                    Sign the Agreement →
                </button>
            </div>
        </div>
    )


}