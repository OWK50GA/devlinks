'use client'

import { platformConfig } from "@/utils/linksOptions";
import { useState } from "react";
import { HiOutlineLink } from "react-icons/hi";
import { IoReorderTwo } from "react-icons/io5";
// import { TfiLineDouble } from "react-icons/tfi";

const LinkForm = () => {

    const platformConfigArray = Object.values(platformConfig)
    console.log(platformConfigArray);
    const [selectedOption, setSelectedOption] = useState(platformConfigArray[0])

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = platformConfigArray.find((platform) => platform.name === e.target.value)
        if (selectedPlatform) {
            setSelectedOption(selectedPlatform)
        }
    }
    const CurrentIcon = selectedOption.icon;

    return ( 
        <div className="bg-[#fafafa] rounded-lg px-5 py-3 flex flex-col gap-4">
            <div className="flex justify-between">
                <p className="flex items-center justify-center gap-2"><span className="text-gray-600"><IoReorderTwo /></span> Link 1</p>
                <p className="text-gray-600">Remove</p>
            </div>

            <form action="" className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="Platform" className="block text-sm text-gray-600">Platform</label>
                    <div className="border border-gray-300 w-full px-4 py-2 flex items-center gap-1 justify-start rounded-lg bg-white">
                        <span>
                            <CurrentIcon />
                        </span>
                        <select name="platform" id="" className="outline-none w-full" value={selectedOption.name} onChange={handleOptionChange}>
                            {
                                platformConfigArray.map((platform) => {
                                    console.log(platform.name)
                                    return (
                                        <option value={platform.name} key={platform.name}>
                                            {platform.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="link" className="block text-sm text-gray-600">Link</label>
                    <div className="border border-gray-300 w-full px-4 py-2 flex items-center gap-3 justify-start rounded-lg bg-white">
                        <span><HiOutlineLink /></span>
                        <input type="text" name="" className="outline-none w-full" id="" placeholder="e.g. https://www.github.com/johnappleseed" />
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default LinkForm;