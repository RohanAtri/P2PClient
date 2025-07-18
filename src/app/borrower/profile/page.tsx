
'use client';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from "next/image";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsGenderMale } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { IoIosMenu, IoIosNotificationsOutline } from "react-icons/io";
import { useSidebarToggle } from "../components/SidebarToggleContext";

export default function ProfilePage() {
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
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
        <div className="bg-[#FFFFFF] border border-[#F1F0EC] py-6 px-8 rounded-[4px] shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative rounded-full overflow-hidden mb-4">
                <Image
                  src="/Profile1.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-2xl font-semibold">Saish Mankame</h1>
            </div>
            <span className="bg-[#E1F0CD] font-semibold px-3 py-1 rounded">Verified User</span>
          </div>
          <div>
            <div className='flex gap-4 mb-8'>
              <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                <LiaBirthdayCakeSolid size={26} />
              </div>
              <div className='flex flex-col'>
                <h4 className='text-[#61625E]'>Date Of Birth</h4>
                <p className='font-semibold'>11th May 1997</p>
              </div>
            </div>
            <div className='flex gap-4 mb-8'>
              <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                <BsGenderMale size={26} />
              </div>
              <div className='flex flex-col'>
                <h4 className='text-[#61625E]'>Gender</h4>
                <p className='font-semibold'>Male</p>
              </div>
            </div>
            <div className='flex gap-4 mb-8'>
              <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                <BsGenderMale size={26} />
              </div>
              <div className='flex flex-col'>
                <h4 className='text-[#61625E]'>Mobile Number</h4>
                <p className='font-semibold'>96122 382112</p>
              </div>
            </div>
            <div className='flex gap-4 mb-8'>
              <div className='bg-[#F0ECE5] px-2 h-12 w-12 flex items-center justify-center'>
                <BsGenderMale size={26} />
              </div>
              <div className='flex flex-col'>
                <h4 className='text-[#61625E]'>Email Address</h4>
                <p className='font-semibold'>saishmankame.sm@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
