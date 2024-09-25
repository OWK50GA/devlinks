'use client'

import { HiOutlineLink } from "react-icons/hi";
import Logo from "./Logo";
import { RxAvatar } from "react-icons/rx";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";

const UserNav = () => {

    const pathname = usePathname();
    console.log(pathname)

    return ( 
        <div className="flex items-center justify-between w-full mx-auto bg-white mt-4 rounded-lg px-6 py-2">
            <Logo />
            <div className="flex gap-5 items-center justify-center">
                {/* <Link href='/user' className={`flex gap-2 items-center px-2 py-2 justify-center ${pathname == '/user'? 'bg-[#efebff]':''}`} passHref>
                    <HiOutlineLink />
                    <p>Links</p>
                </Link> */}
                <NavLink href="/user">
                    <HiOutlineLink />
                    <p>Links</p>
                </NavLink>
                <NavLink href="/user/profile">
                    <RxAvatar />
                    <p>Profile Details</p>
                </NavLink>
                {/* <Link href='/user/profile' className={`flex gap-2 items-center px-2 py-2 rounded-lg justify-center ${pathname == '/user/profile'? 'bg-[#efebff]':''}`} passHref>
                    <RxAvatar />
                    <p>Profile Details</p>
                </Link> */}
            </div>
            <div>
                <Button text="Preview" dark={false}/>
            </div>
        </div>
     );
}
 
export default UserNav;