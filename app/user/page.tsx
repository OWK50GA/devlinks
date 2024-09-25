'use client'

import Button from "@/components/Button";
import LinkForm from "@/components/LinkForm";
import { instrumentSans } from "@/utils/fonts";
import Image from "next/image";
import { useState } from "react";
import getStartedImg from '../../public/Group 273.png'

const UserPage = () => {

    const [linksNo, setLinksNo] = useState(0)

    const handleAddLink = () => {
        setLinksNo(linksNo + 1)
    }

    return ( 
        <div className={"bg-white h-screen rounded-xl p-8 " + instrumentSans.className}>
            <div className="flex flex-col gap-3">
                <p className="font-extrabold text-3xl">Customize your links</p>
                <p className="text-sm text-gray-600">Add/edit/remove links below and then share all your profiles with the world!</p>
                <div className="mt-5 font-bold">
                    <Button text="+ Add new link" full dark={false} clickHandler={handleAddLink}/>
                </div>
            </div>
            
            <div className={`h-[470px] mt-8 ${linksNo == 0 ? 'bg-[#fafafa] grid place-items-center rounded-xl':'max-h-[470px] overflow-y-scroll'}`}>
                {
                    linksNo == 0 ?
                    <div className="flex flex-col justify-center items-center">
                        <Image src={getStartedImg} alt="Get Started"/>
                        <p className={"mt-8 text-2xl font-extrabold"}>Let's get you started</p>
                        <p className="w-3/5 mt-5 mx-auto text-sm text-gray-500 text-center">
                            Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them.
                            We're here to help you share your profiles with everyone!
                        </p>
                    </div>
                    :
                    [...Array(linksNo)].map((index) => {
                        return (
                            <div className="p-4" key={index}>
                                <LinkForm />
                            </div>
                        )
                    })
                }
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
 
export default UserPage;