import MockUp from "../../components/MockUp";
import UserNav from "../../components/UserNav";

const UserLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-[94%] mx-auto">
            <UserNav />

            <div className="mt-10 flex gap-16">
                <div className="hidden sm:block w-[38%]">
                    <MockUp />
                </div>
                <div className="w-[57%] h-screen">
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default UserLayout;