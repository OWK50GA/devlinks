'use client'

import { LinkFormValues } from "@/app/user/page";
import { platformConfig } from "@/utils/linksOptions";
import { StringFormat } from "firebase/storage";
import { useState } from "react";
import { Control, SubmitHandler, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { HiOutlineLink } from "react-icons/hi";
import { IoReorderTwo } from "react-icons/io5";
// import { TfiLineDouble } from "react-icons/tfi";

type LinkFormProps = {
    register: UseFormRegister<LinkFormValues>,
    control: Control<LinkFormValues>,
    index: number,
    remove: UseFieldArrayRemove,
    setLinksNo: React.Dispatch<React.SetStateAction<number>>,
    // handleSubmit: SubmitHandler<LinkFormValues>,
    // onSubmit: () => void
    field: {
        platform: string,
        link: string,
    }
}

const LinkForm = ({register, control, index, remove, setLinksNo, field}: LinkFormProps) => {

    // Get array from the platform config object, get initial fields to repopulate and match each of them to their correct icons
    const platformConfigArray = Object.values(platformConfig)

    const initialPlatform = platformConfigArray.find(
        (platform) => platform.name === field.platform
    ) || platformConfigArray[0]
    const [selectedOption, setSelectedOption] = useState(initialPlatform)

    // function to fire whenever user changes link option
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = platformConfigArray.find((platform) => platform.name === e.target.value)
        if (selectedPlatform) {
            setSelectedOption(selectedPlatform)
        }
    }
    const CurrentIcon = selectedOption.icon;

    // remove function
    const handleRemove = () => {
        remove(index);
        setLinksNo((prev) => prev - 1)
    }

    return ( 
        <div className="bg-[#fafafa] rounded-lg px-5 py-3 flex flex-col gap-4">
            <div className="flex justify-between">
                <p className="flex items-center justify-center gap-2"><span className="text-gray-600"><IoReorderTwo /></span> Link #{index + 1}</p>
                <button 
                    className="text-gray-600"
                    onClick={handleRemove}
                    // variant="destructive"
                >
                    Remove
                </button>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="platform" className="block text-sm text-gray-600">Platform</label>
                    <div className="border border-gray-300 w-full px-4 py-2 flex items-center gap-1 justify-start rounded-lg bg-white focus-within:border-[#633cff]">
                        <span>
                            <CurrentIcon />
                        </span>
                        <select 
                            // name="platform" 
                            id="" 
                            className="outline-none w-full" 
                            value={selectedOption.name}
                            {...register(`links.${index}.platform` as const, {
                                onChange: handleOptionChange
                            })}
                        >
                            {
                                platformConfigArray.map((platform) => {
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
                    <div className="border border-gray-300 w-full px-4 py-2 flex items-center gap-3 justify-start rounded-lg bg-white focus-within:border-[#633cff]">
                        <span>
                            <HiOutlineLink />
                        </span>
                        <input 
                            type="text" 
                            className="outline-none w-full" 
                            id="" 
                            placeholder="e.g. https://www.github.com/johnappleseed" 
                            {...register(`links.${index}.link` as const)}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LinkForm;