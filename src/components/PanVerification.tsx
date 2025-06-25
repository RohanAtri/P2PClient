import React, { useState } from "react";

type PANVerificationProps = {
  onVerified: () => void;
};

const PanVerification = ({ onVerified }: PANVerificationProps) => {
    const [gender, setGender] = useState('Male');
    const [empType, setEmpType] = useState('Salaried');

    const genderOptions = ['Male', 'Female', 'Other'];
    const empOptions = ['Salaried', 'Self Employed'];

    const [pan, setPan] = useState("");
    const [dob, setDob] = useState("");
    const [name, setName] = useState("");
    const [consents, setConsents] = useState<string[]>([]);

    const formatDob = (dateStr: string) => {
        if (!dateStr) return "";
        const [yyyy, mm, dd] = dateStr.split("-");
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const body = {
            pan,
            dob: formatDob(dob),
            name,
            gender,
            employment_type: empType,
            concents: consents,
        };
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert("Access token missing");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}customers/verification`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // ⬅️ Set token here
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.status === 200) {
                alert('PAN Varified')
                onVerified();
            } else {
                //alert(data.message || "PAN verification failed.");
            }
        } catch (error) {
            console.error("PAN API Error:", error);
            //alert("Something went wrong.");
        }
    };


    return (
        <>
            <div className="w-[80%] h-full flex justify-start items-center px-22">
                {true ? (
                    <form onSubmit={handleSubmit}>
                        <div className="w-full h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-semibold text-center mb-5 text-[#171717]">
                                Enter your PAN Number and Date of Birth
                            </h2>

                            <div className="mb-4">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name as per PAN card"
                                    className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    PAN <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your PAN"
                                    value={pan}
                                    onChange={(e) => setPan(e.target.value)}
                                    className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full border border-[#A3A3A3] outline-none placeholder-[#A3A3A3] px-3 py-2 rounded-[2px] bg-white"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    Gender <span className="text-red-500">*</span>
                                </label>

                                <div className="flex justify-between space-x-4 w-full">
                                    {genderOptions.map((option) => (
                                        <label
                                            key={option}
                                            className={`w-[30%] flex items-center border rounded-[1px] px-4 py-2 cursor-pointer transition-all duration-150
          ${gender === option ? 'border-black bg-gray-100' : 'border-gray-300'}
        `}
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={gender === option}
                                                onChange={() => setGender(option)}
                                                className="form-radio text-black mr-2"
                                            />
                                            <span className="text-[#0A0A0A] text-[16px]">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-[14px] font-medium text-[#0A0A0A] mb-1">
                                    Employment Type <span className="text-red-500">*</span>
                                </label>

                                <div className="flex justify-between space-x-4 w-full">
                                    {empOptions.map((option) => (
                                        <label
                                            key={option}
                                            className={`w-[47%] flex items-center border rounded-[1px] px-4 py-2 cursor-pointer transition-all duration-150
          ${empType === option ? 'border-black bg-gray-100' : 'border-gray-300'}
        `}
                                        >
                                            <input
                                                type="radio"
                                                name="empType"
                                                value={option}
                                                checked={empType === option}
                                                onChange={() => setEmpType(option)}
                                                className="form-radio text-black mr-2"
                                            />
                                            <span className="text-[#0A0A0A] text-[16px]">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-start space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const label = "CIBIL";
                                        setConsents((prev) =>
                                            checked ? [...prev, label] : prev.filter((c) => c !== label)
                                        );
                                    }}
                                    id="terms"
                                    className="w-4 h-4  text-white bg-black border-none rounded checked:bg-black checked:border-none"
                                />
                                <label htmlFor="terms" className="text-sm text-[#171717]">
                                    I authorise 1 Finance P2P to access my CIBIL score
                                </label>
                            </div>
                            <div className="flex items-center justify-start space-x-2 mb-5">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const label = "PAN_CKYC"; // second checkbox
                                        setConsents((prev) =>
                                            checked ? [...prev, label] : prev.filter((c) => c !== label)
                                        );
                                    }}
                                    className="w-4 h-4  text-white bg-black border-none rounded checked:bg-black checked:border-none"
                                />
                                <label htmlFor="terms" className="text-sm text-[#171717]">
                                    I agree that my data can downloaded from PAN and CKYC
                                </label>
                            </div>

                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#737373] text-white rounded-[2px] hover:bg-[#5e5e5e] transition duration-300 ease-in-out"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <h2>PAN Confirmed</h2>
                )}
            </div>
        </>


    )
}

export default PanVerification;