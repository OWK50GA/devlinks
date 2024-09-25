'use client'

import { useRef } from "react";
import { LiaImage } from "react-icons/lia";

const ProfileForm = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    return ( 
        <div>  
            <form action="" className="flex flex-col gap-6">

                <div className="w-full bg-[#fafafa] flex justify-start items-center px-6 py-5 gap-32 rounded-lg">
                    <div>
                        <p className="text-gray-600 text-sm">Profile picture</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                name="profile-picture"
                                accept="image/png, image/jpeg, image/jpg"
                                className="hidden" 
                            />
                            <label 
                                htmlFor="fileInput"
                                className="cursor-pointer flex flex-col items-center justify-center 
                                h-40 w-full gap-3 text-center rounded-lg bg-[#efebff] px-5 font-bold text-[#633cff]"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <LiaImage className="text-3xl"/>
                                <p className="">+ Upload Image</p>
                            </label>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Image must be below 1024x1024px. <br />Use PNG or JPG format</p>
                        </div>
                    </div>

                </div>

                <div className="w-full bg-[#fafafa] flex flex-col gap-4 px-6 py-5 rounded-xl">
                    <div className="flex justify-start gap-32 items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">First Name*</label>
                        <input 
                            type="text" name="" id="" placeholder="e.g. John"
                            className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"
                        />
                    </div>

                    <div className="flex justify-start gap-32 items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">Last Name*</label>
                        <input 
                            type="text" name="" id="" placeholder="e.g. John"
                            className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"
                        />
                    </div>

                    <div className="flex justify-start gap-[164px] items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">Email*</label>
                        <input 
                            type="text" name="" id="" placeholder="e.g. John"
                            className="outline-none rounded-lg border border-gray-300 px-4 py-2 w-full"
                        />
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default ProfileForm;