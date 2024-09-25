import Button from "@/components/Button";
import ProfileForm from "@/components/ProfileForm";
import { instrumentSans } from "@/utils/fonts";

const ProfilePage = () => {
    return ( 
        <div className={"bg-white h-screen rounded-xl p-8 " + instrumentSans.className}>
            <div className="flex flex-col gap-3">
                <p className="font-extrabold text-3xl">Profile Details</p>
                <p className="text-sm text-gray-600">Add your details to create a personal touch to your profile.</p>
            </div>

            <div className="h-[540px] mt-8">
                <ProfileForm />
            </div>

            <div className="mt-4">
                <hr />
                <div className="w-full flex justify-end items-center mt-6 font-bold">
                    <Button text="Save" dark/>
                </div>
            </div>
        </div>
     );
}
 
export default ProfilePage;