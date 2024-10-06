import MockUp from "../../components/MockUp";
import UserNav from "../../components/UserNav";

const UserLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-[94%] mx-auto">
            <UserNav />

            <div className="mt-10 flex gap-16">
                <div className="hidden lg:block w-[38%] flex-shrink-0">
                    <MockUp />
                </div>
                <div className="flex-grow w-full">
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default UserLayout;