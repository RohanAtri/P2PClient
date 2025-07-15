'use client'

import { useEffect, useState } from "react";

export default function Selection() {
    const [value, setValue] = useState(100000);
    const min = 10000;
    const max = 200000;
    const [plans, setPlans] = useState([
        {
            label: '6 Months',
            emi: 'Rs 10,000',
            interest: '12%',
            amount: 'Rs 1,00,000',
            count: 6,
            active: true,
        },
        {
            label: '12 Months',
            emi: 'Rs 10,000',
            interest: '12%',
            amount: 'Rs 1,00,000',
            count: 12,
            active: false,
        },
        {
            label: '24 Months',
            emi: 'Rs 10,000',
            interest: '12%',
            amount: 'Rs 1,00,000',
            count: 24,
            active: false,
        },
    ]);

    const handleChange = (e: any) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue);
    };

    useEffect(() => {
        setRangeStyle(calculateBackground(value));
    }, [value]);

    const calculateBackground = (value: number) => {
        const percent = ((value - min) / (max - min)) * 100;
        return {
            background: `linear-gradient(to right, #22443D 0%, #22443D ${percent}%, #EBE9DB ${percent}%, #EBE9DB 100%)`,
        };
    };
    const [rangeStyle, setRangeStyle] = useState({});

    const handlePlanClick = (index: number) => {
        setPlans(plans =>
          plans.map((plan, i) => ({
            ...plan,
            active: i === index
          }))
        );
      };

    return (
        <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] relative flex justify-center overflow-y-auto">
            {/* Top 30% background */}
            <div className="absolute top-0 left-0 w-full h-[28%] bg-[#F9F7E8] z-0" />

            {/* Main content (positioned above the background) */}
            <div className="w-[70%] relative z-10 py-10">
                <h1 className="md:text-2xl text-xl font-bold mb-4">Hello John, you have been sanctioned a loan of Rs 1,00,000</h1>
                <div className="bg-[#fff] border-2 border-[#F9F7E8] py-4 px-6 rounded flex flex-col gap-4 mb-6">
                    <p>Select Amount</p>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-2xl font-semibold">₹{value.toLocaleString("en-IN")}</h3>
                        <span className="text-md text-[#fff] py-1 px-2 bg-[linear-gradient(to_bottom,_var(--stepper-upper),_var(--stepper-lower))] rounded">12% p.a.</span>
                    </div>
                    <div>
                        <input type="range" min="10000" step={5000} max="200000" value={value} onChange={handleChange} style={rangeStyle}
                            className="custom-range w-full" />

                        <div className="flex justify-between text-sm">
                            <span>Rs 10,000</span>
                            <span>Rs 2,00,000</span>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`mx-2 mt-2 mb-2 rounded shadow cursor-pointer ${plan.active ? 'bg-[#e1dbc4] border-[#e1dbc4]' : 'bg-white border-[#BBBBBB]'
                                }`}
                            onClick={() => handlePlanClick(i)}
                        >
                            <div className="text-center font-semibold text-lg py-3">{plan.label}</div>
                            <div className="bg-white mx-2 mb-2 px-4 py-5 space-y-2 text-sm text-gray-800">
                                <div className="flex justify-between">
                                    <span>EMI amount</span>
                                    <span className="font-semibold">{plan.emi}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rate of Interest</span>
                                    <span className="font-semibold">{plan.interest}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Loan Amount</span>
                                    <span className="font-semibold">{plan.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>No of EMI</span>
                                    <span className="font-semibold">{plan.count}</span>
                                </div>

                                {/* Confirm Button */}
                                <div className="mt-5 flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => handlePlanClick(i)}
                                        className={`relative flex items-center px-6 py-2 rounded-[2px] text-[#fff] 
                                            before:content-[''] before:absolute before:inset-0 before:rounded-[3px] before:border
                                            before:-z-10 before:translate-y-[3px] before:translate-x-[3px] 
                                            z-10
                                            bg-[#171717] border-[#171717] cursor-pointer before:border-[#171717]`}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
