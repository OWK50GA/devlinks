'use client'

import Image from 'next/image'
import mockUp from '../public/preview-section.svg'
import { useAuth } from "@/context/AuthContext";
import { platformConfig } from "@/utils/linksOptions";

type Link = {
    platform: string,
    link: string
}

const MockUp = () => {

    const context = useAuth();
    const userData = context?.userDataObj;

    return ( 
        <div className="bg-white h-screen p-6 flex flex-col justify-center items-center rounded-xl">
            <Image src={mockUp} alt='Mobile Preview'/>
            <div>
                <div className="absolute top-[28.9%] left-[9.3%] px-10 py-10 flex flex-col rounded-lg w-[23%] h-fit">
                    <div className="border-4 border-[#633cff] rounded-full w-34 h-34 mx-auto flex items-center">
                        <div 
                            className="rounded-full w-20 h-20 mx-auto flex items-center text-white"
                            style={{
                                backgroundImage: userData?.profilePicture ? `url(${userData.profilePicture})`: ``,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>
                    </div>

                    <div className="self-center mt-4 flex flex-col gap-[0.35rem] bg-white w-full">
                        <p className="text-center font-bold text-2xl">
                            {userData?.username} 
                        </p>
                        <p className="text-center font-semibold text-lg">
                            {userData?.firstname} {userData?.lastname}  
                        </p>
                        <p className="text-center font-light text-sm">
                            {userData?.email}
                        </p>
                    </div>

                    {
                        userData?.links? 
                        <div className="flex flex-col gap-4 mt-4 max-h-[40vh] ml-[0.35rem] -mr-[0.35rem]">
                            {
                                userData?.links?.slice(0, 5).map((link: Link) => {
                                    const platformConfigArray = Object.values(platformConfig)
                                    const platform = platformConfigArray.find((platform) => link.platform === platform.name)
                                    const PlatformIcon = platform?.icon
                                    const platformColor = platform?.color
                                    const platformName = platform?.name
                                    return (
                                        <button 
                                            key={link.platform} className={` w-full px-3 py-3 rounded-lg`}
                                            style={{
                                                backgroundColor: platformColor ? platformColor : '',
                                                color: platformName !== 'Frontend Mentor'? 'white' : ''
                                            }}
                                        >
                                            <a href={`${link.link}`} target="_blank" className="flex justify-between items-center">
                                                <p className="flex items-center justify-start gap-2">
                                                    {PlatformIcon && <PlatformIcon />}
                                                    {link.platform}
                                                </p>
                                                <p>
                                                    &#8594;
                                                </p>
                                            </a>
                                        </button>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                    }

                </div>
            </div>
        </div>
     );
}
 
export default MockUp;