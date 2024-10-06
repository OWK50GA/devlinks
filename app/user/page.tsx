'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import Button from "@/components/Button";
import LinkForm from "@/components/LinkForm";
import { instrumentSans } from "@/utils/fonts";
import Image from "next/image";
import { useState } from "react";
import getStartedImg from '../../public/Group 273.png'
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { redirect } from 'next/navigation';
// import firebase from 'firebase/compat/app';

export type LinkFormValues = {
    links: {
        platform: string,
        link: string,
    }[]
}

type Link = {
    platform: string,
    link: string
}

const UserPage = () => {

    // Important states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    // Get current user context
    const context = useAuth()
    const currentUser = context?.currentUser;
    const setUserDataObj = context?.setUserDataObj;
    const userDataObj = context?.userDataObj;

    const currentLinks = userDataObj?.links

    if (!currentUser) {
        redirect('/login')
    }

    const [linksNo, setLinksNo] = useState(0)

    const { register, formState: {errors}, control, handleSubmit } = useForm<LinkFormValues>({
        defaultValues: {
            // Repopulate forms with existing data
            links: currentLinks.map((currentLink: Link) => ({
                platform: currentLink.platform,
                link: currentLink.link
            })) || []
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control,
        rules: { maxLength: 14 },
        
    });
    // linksNo++;
    const handleAddLink = () => {
        append({
            platform: 'Github',
            link: ''
        })
        setLinksNo((prev) => prev + 1)
    }

    const onSubmit = async (values: LinkFormValues) => {

        setLoading(true);
        
        // Ascertain absence of duplicates and serve error
        const platforms = values.links.map((link) => link.platform)
        const hasDuplicates = new Set(platforms).size !== platforms.length

        if (hasDuplicates) {
            setError('Duplicate platform Detected')
            setLoading(false)
            return
        }
        
        // Push to backend
        const userId = currentUser?.uid;
        const userDocRef = doc(db, 'users', userId);
        try {
            const userDoc = await getDoc(userDocRef)
            if (userDoc.exists()) {
                let existingData = userDoc.data()

                const newData = {
                    ...existingData,
                    links: values.links
                }

                await setDoc(userDocRef, newData)
                setUserDataObj(newData);
            } else {
                await setDoc(userDocRef, values)
            }
        } catch (err) {
            console.error('An error occured: ', err)
        } finally {
            setLoading(false)
        }
    }

    return ( 
        <div className={"bg-white h-fit md:h-screen rounded-xl p-8"}>
            <div className={`flex flex-col gap-3 ${instrumentSans.className}`}>
                <p className={`font-extrabold sm:text-3xl text-2xl`}>Customize your links</p>
                <p className="text-sm text-gray-600">Add/edit/remove links below and then share all your profiles with the world!</p>
                <div className="mt-5 font-bold">
                    <Button text="+ Add new link" full dark={false} clickHandler={handleAddLink}/>
                </div>
            </div>
            
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className={`h-[470px] mt-8 ${fields.length === 0 ? 'bg-[#fafafa] grid place-items-center rounded-xl':'max-h-[470px] overflow-y-scroll'}`}>
                        {
                            fields.length === 0 ?
                            <div className="flex flex-col justify-center items-center">
                                <Image src={getStartedImg} alt="Get Started"/>
                                <p className={"mt-8 text-2xl font-extrabold"}>Let's get you started</p>
                                <p className="w-3/5 mt-5 mx-auto text-sm text-gray-500 text-center">
                                    Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them.
                                    We're here to help you share your profiles with everyone!
                                </p>
                            </div>
                            :
                            (
                                <div className='flex flex-col gap-4'>
                                    {
                                        fields.map((field, index) => {
                                            return (
                                                <LinkForm 
                                                    key={field.id} 
                                                    register={register} 
                                                    index={index} 
                                                    control={control} 
                                                    remove={remove} 
                                                    setLinksNo={setLinksNo}
                                                    field={field}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    {error && <div className='text-base text-[#FF3939] font-light'>{error}</div>}

                </div>

                <div className="mt-4">
                    <hr />
                    <div className="w-full flex justify-end items-center mt-6 font-bold">
                        <Button text={`${loading ? "Saving..." : "Save"} `} disabled={loading} dark mobileFull/>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default UserPage;