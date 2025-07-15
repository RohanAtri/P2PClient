'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarToggle } from './SidebarToggleContext';
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsBank } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
import { CiCalculator1 } from "react-icons/ci";
import { BiHelpCircle } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import clsx from 'clsx';

const menu = [
  { name: 'Profile details', href: '/borrower/profile', icon: CgProfile },
  { name: 'Settings', href: '/borrower/settings', icon: IoSettingsOutline },
  { name: 'Bank & KYC Details', href: '/borrower/bank-kyc', icon: BsBank },
  { name: 'Transaction Statement', href: '/borrower/transaction-statement', icon: GrNotes },
  { name: 'Reports', href: '/borrower/reports', icon: TbReportMoney },
  { name: 'Calculators', href: '/borrower/calculators', icon: CiCalculator1 },
  { name: 'Help & Support', href: '/borrower/help-support', icon: BiHelpCircle },
  { name: 'Log Out', href: '/borrower/logout', icon: MdOutlineLogout },
];

export default function RightSidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebarToggle();

  const isDashboard = pathname === '/borrower/dashboard';

  return (
    <aside
      className={clsx(
        'fixed right-0 w-[304px] h-full bg-white shadow-lg transition-transform z-50 p-4',
        {
          'translate-x-0': !isDashboard || isOpen,
          'translate-x-full': isDashboard && !isOpen,
        }
      )}
    >
      <div className='flex justify-end'>
      {isDashboard && (
        
        <button onClick={toggleSidebar} className="p-2 outline-none border-none bg-transparent">
          <RxCross2 size={20} className='text-[#0A0A0A]'/>
        </button>
      )}
      </div>

      <div className="w-20 h-20 relative rounded-full overflow-hidden mb-4">
      <Image
        src="/Profile1.png"
        alt="Profile"
        fill
        className="object-cover"
      />
    </div>
    <h1 className='text-2xl font-semibold'>Saish Mankame</h1>
      <nav className="flex flex-col mt-10 gap-4">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 text-[#0A0A0A]"
            >
              <Icon size={20}/>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
