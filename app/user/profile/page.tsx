import Button from "@/components/Button";
import ProfileForm from "@/components/ProfileForm";
import { instrumentSans } from "@/utils/fonts";

const ProfilePage = () => {

    return ( 
        <div className={`bg-white h-[890px] sm:h-screen rounded-xl p-8 ${instrumentSans.className}`}>
            <div className={`flex flex-col gap-3 ${instrumentSans.className}`}>
                <p className="font-bold md:text-3xl text-2xl">Profile Details</p>
                <p className="text-sm text-gray-600">Add your details to create a personal touch to your profile.</p>
            </div>

            <div className="h-[540px] mt-8">
                <ProfileForm />
            </div>
        </div>
     );
}
 
export default ProfilePage;