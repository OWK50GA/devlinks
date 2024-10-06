'use client'

import { HiOutlineLink } from "react-icons/hi";
import Logo from "./Logo";
import { RxAvatar } from "react-icons/rx";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";
import { useAuth } from "@/context/AuthContext";
import { IoEyeOutline } from "react-icons/io5";
import { instrumentSans } from "@/utils/fonts";
import devlinks from '../public/solar_link-circle-bold.png'
import Image from "next/image";

const UserNav = () => {

    const context = useAuth();
    const userDataObj = context?.userDataObj;
    const email = userDataObj?.email;

    return ( 
        <div className="flex items-center justify-between w-full mx-auto bg-white mt-4 rounded-lg px-6 py-2">
            <span className="hidden sm:block"><Logo /></span>
            <Image src={devlinks} alt="logo" className="sm:hidden"/>
            <div className="flex gap-5 items-center justify-center">
                {/* <Link href='/user' className={`flex gap-2 items-center px-2 py-2 justify-center ${pathname == '/user'? 'bg-[#efebff]':''}`} passHref>
                    <HiOutlineLink />
                    <p>Links</p>
                </Link> */}
                <NavLink href="/user">
                    <HiOutlineLink />
                    <p className="hidden sm:block">Links</p>
                </NavLink>
                <NavLink href="/user/profile">
                    <RxAvatar />
                    <p className="hidden sm:block">Profile Details</p>
                </NavLink>
                {/* <Link href='/user/profile' className={`flex gap-2 items-center px-2 py-2 rounded-lg justify-center ${pathname == '/user/profile'? 'bg-[#efebff]':''}`} passHref>
                    <RxAvatar />
                    <p>Profile Details</p>
                </Link> */}
            </div>
            <div className="flex justify-center items-center">
                <Link href={`/${email}`}>
                    <span className="hidden sm:block">
                        <Button dark={false} text="Preview" />
                    </span>
                    <div className="grid place-items-center rounded-md border border-[#633cff] px-2 py-[0.4rem] font-bold sm:hidden">
                        <IoEyeOutline className="text-[#633cff]"/>
                    </div> 
                </Link>
            </div>
        </div>
     );
}
 
// className={`text-[#633cff] px-6 sm:px-10 whitespace-nowrap font-bold py-2 sm:py-3' ${instrumentSans.className}`}

export default UserNav;