
'use client';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IoIosMenu, IoIosNotificationsOutline } from "react-icons/io";
import { useSidebarToggle } from "../components/SidebarToggleContext";
import { BsDatabaseAdd } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function SettingPage() {
  const { toggleSidebar } = useSidebarToggle();
  const router = useRouter();
  const gotoDashboard = () => {
    router.push("/borrower/dashboard");
  };
  return (
    <div className="w-full h-[calc(100vh-65px)] md:h-[calc(100vh-85px)] relative overflow-y-auto hide-scrollbar bg-[#F9F9F9]">
      <div className="md:py-10 md:px-20">
        <div className="flex justify-between mb-4 md:mb-8 p-2 md:p-0">
          <button className="flex items-center gap-2" onClick={gotoDashboard}>
            <MdKeyboardArrowLeft size={20} />
            <span className="text-[#292928]">Back</span>
          </button>
          <div className='flex gap-2'>
            <IoIosNotificationsOutline className='text-2xl cursor-pointer' />
            <IoIosMenu onClick={toggleSidebar} className='text-2xl cursor-pointer' />
          </div>
        </div>
        <div className="p-2 md:p-0 mb-2 md:mb-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        <div className="bg-[#FFFFFF] border border-[#F1F0EC] py-6 px-8 rounded-[4px] shadow-sm">
          <div className="mb-6">
            <div className="flex gap-4 items-center">
              <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                <FaWhatsapp size={24} />
              </div>
              <h3>Receive updates on Whatsapp</h3>
            </div>
          </div>
          <div>

            <div>
              <div className="flex gap-4 items-center">
                <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                  <MdOutlineDelete size={24} />
                </div>
                <h3>Delete Account</h3>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
