'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavLinkProps = {
    children: React.ReactNode;
    href: string;
}

const NavLink = ({children, href}: NavLinkProps) => {

    const pathname = usePathname();
    console.log(pathname)
    const isActive = pathname === href;

    return ( 
        <Link href={href}>
            <div className={`flex gap-2 items-center justify-center px-5 py-2 ${isActive? 'bg-[#efebff] text-[#633cff] rounded-lg font-semibold':''}`}>
                {children}
            </div>
        </Link>
     );
}
 
export default NavLink;