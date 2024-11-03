'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LiaImage } from "react-icons/lia";
import { isValid, string, z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'
// import { File } from "buffer";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";


const ProfileForm = () => {

    const context = useAuth();
    const currentUser = context?.currentUser;
    const setUserDataObj = context?.setUserDataObj;
    const userDataObj = context?.userDataObj;

    const isUsernameAvailable = async (username: string): Promise<boolean> => {
        if (username.length < 4) return false;
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty || username === userDataObj?.username;
    };

    const profileFormSchema = z.object({
        firstname: z.string().min(1, "Cannot be empty"),
        lastname: z.string().min(1, "Cannot be empty"),
        email: z.string().email('Invalid email format'),
        username: z.string().min(4, "At least 4 characters")
            .refine(async (username) => {
                try {
                    return await isUsernameAvailable(username)
                } catch (error) {
                    console.error("Validation error", error)
                }
            }, {
                message: 'Username Taken',
            }),
        profilePicture: z
        .custom<FileList | null>((value) => {
            if (value && value.length > 0) {
            return true; // Valid if a file is uploaded
            }
            return false; // Invalid if no file is uploaded
        }, {
            message: 'Please upload one image'
        })
            .refine((files) => !files || files.length === 1, {
            message: 'Please upload one image',
            })
            .refine((files) => !files || files[0]?.size <= 5 * 1024 * 1024, {
            message: 'Max file size is 5MB',
            })
            .refine((files) => !files || ["image/jpeg", "image/png"].includes(files[0]?.type), {
            message: 'Accepted formats are JPEG and PNG',
            })
            .transform((files) => files ? files[0] : null), // Return the file if it exists
    })

    type ProfileFormSchema = z.infer<typeof profileFormSchema>

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [usernameStatus, setUsernameStatus] = useState<{
        isChecking: boolean,
        isValid: boolean | null,
        message: string,
    }>({
        isChecking: false,
        isValid: null,
        message: ''
    })

    const [imagePreview, setImagePreview] = useState<string | null>(userDataObj?.profilePicture || null)

    if (!currentUser) {
        redirect('/login')
        // return
    }    

    const {
        register, reset, handleSubmit, formState: {errors, touchedFields}, watch
    } = useForm<ProfileFormSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            profilePicture: userDataObj?.profilePicture || '',
            firstname: userDataObj?.firstname || '',
            lastname: userDataObj?.lastname || '',
            email: userDataObj?.email || '',
            username: userDataObj?.username || '',
        }
    })

    const usernameValue = watch('username');

    useEffect(() => {
        const checkUsername = async () => {
            if (!usernameValue || usernameValue.length < 4) {
                setUsernameStatus({
                    isChecking: false,
                    isValid: null,
                    message: '',
                });
                return
            }

            setUsernameStatus(prev => ({...prev, isChecking: true }));

            try {
                const isAvailable = await isUsernameAvailable(usernameValue)
                setUsernameStatus({
                    isChecking: false,
                    isValid: isAvailable,
                    message: isAvailable ? 'Username Available' : 'Username Taken'
                })
            } catch (error) {
                setUsernameStatus({
                    isChecking: false,
                    isValid: false,
                    message: 'Error Checking Username'
                })
            }
        }

        const timeoutId = setTimeout(checkUsername, 500)
        return () => clearTimeout(timeoutId)

    }, [usernameValue])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImagePreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: ProfileFormSchema) => {
        if (!currentUser.uid) return

        setLoading(true)
        const userId = currentUser?.uid
        const userDocRef = doc(db, 'users', userId)
        try {
            const userDoc = await getDoc(userDocRef);
            let imageUrl = `${imagePreview}`
            
            if (values.profilePicture) {
                const imageFile = values.profilePicture
                const storageRef = ref(storage, `users/${userId}/${imageFile.name}`)
                await uploadBytes(storageRef, imageFile)
                imageUrl = await getDownloadURL(storageRef);
            }

            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    profilePicture: imageUrl,
                    username: values.username,
                })
            } else {
                await setDoc(userDocRef, {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    profilePicture: imageUrl,
                    username: values.username,
                })
            }

            setUserDataObj((prev) => ({
                ...prev,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                profilePicture: imageUrl,
                username: values.username,
            }))

            setLoading(false)

        } catch (err) {
            console.error('Error updating/creating profile: ', err)
            setError(`Error submitting form: ${err}`)
            setLoading(false)
        } finally {
            setLoading(false)
        }
        setLoading(false)
    }

    return ( 
        <div>  
            <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

                <div className="w-full bg-[#fafafa] flex flex-col md:flex-row justify-start md:items-center px-6 py-5 gap-4 md:gap-32 rounded-lg">
                    <div>
                        <p className="text-gray-600 text-sm">Profile picture</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div>
                            <input 
                                type="file" 
                                id='fileInput'
                                // name="profile-picture"
                                accept="image/png, image/jpeg, image/jpg"
                                className="absolute top-0 left-0 w-full h-full opacity-0 -z-10"
                                {...register('profilePicture')}
                                onChange={(e) => handleFileChange(e)}
                            />
                            <label 
                                htmlFor="fileInput"
                                className="cursor-pointer flex flex-col items-center justify-center 
                                h-48 md:h-40 w-48 md:w-full gap-3 text-center rounded-lg bg-[#efebff] px-5 font-bold text-[#633cff]"
                                style={{
                                    backgroundImage: imagePreview? `url(${imagePreview})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <LiaImage className="text-3xl"/>
                                <p className="">+ Upload Image</p>
                            </label>
                            {errors.profilePicture ? (
                                <div className="text-sm text-[#FF3939] font-light">{errors.profilePicture.message}</div> 
                            ) : null}
                        </div>
                        
                        <div>
                            <p className="text-gray-600 text-sm">Image must be below 1024x1024px. <br />Use PNG or JPG format</p>
                        </div>
                    </div>

                </div>

                <div className="w-full bg-[#fafafa] flex flex-col gap-4 px-6 py-5 rounded-xl">
                    <div className="md:flex justify-start gap-32 items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">First Name*</label>
                        <input 
                            type="text" id="" placeholder="e.g. John"
                            className={`outline-none rounded-lg border border-gray-300 px-4 py-2 w-full ${errors.firstname ? 'border-[#FF3939]': ''}`}
                            {...register('firstname')}
                        />
                        {errors.firstname ? (
                                <div className="text-sm text-[#FF3939] font-light">{errors.firstname.message}</div> 
                            ) : null}
                    </div>

                    <div className="md:flex justify-start gap-32 items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">Last Name*</label>
                        <input 
                            type="text" id="" placeholder="e.g. John"
                            className={`outline-none rounded-lg border border-gray-300 px-4 py-2 w-full ${errors.lastname ? 'border-[#FF3939]': ''}`}
                            {...register('lastname')}
                        />
                        {errors.lastname ? (
                                <div className="text-sm text-[#FF3939] font-light">{errors.lastname.message}</div> 
                            ) : null}
                    </div>

                    <div className="md:flex justify-start gap-[164px] items-center">
                        <label htmlFor="firstName" className="text-nowrap text-gray-500">Email*</label>
                        <input 
                            type="text" id="" placeholder="e.g. John"
                            className={`outline-none rounded-lg border border-gray-300 px-4 py-2 w-full ${errors.email ? 'border-[#FF3939]': ''}`}
                            {...register('email')}
                        />
                        {errors.email ? (
                                <div className="text-sm text-[#FF3939] font-light">{errors.email.message}</div> 
                            ) : null}
                    </div>

                    <div className="md:flex justify-start gap-[133px] items-center">
                        <label htmlFor="username" className="text-nowrap text-gray-500">Username*</label>
                        <input 
                            type="text" id="" placeholder="johnnydoey"
                            className={`outline-none rounded-lg border border-gray-300 px-4 py-2 w-full ${errors.username ? 'border-[#FF3939]': ''}`}
                            {...register('username')}
                        />
                        {errors.username ? (
                            <div>{errors.username.message}</div>
                        ) : null}
                    </div>

                    <div className="flex ml-[0] md:ml-[220px] gap-2 items-center">
                        {
                            touchedFields.username && usernameValue && usernameValue.length >= 4 && (
                                <div>
                                    {usernameStatus.isChecking ? (
                                        <div className="animate-spin">⌛</div>
                                    ) : usernameStatus.isValid ? (
                                        <FaCheckCircle className="text-green-500"/>
                                    ) : (
                                        <FaXmark className="text-red-500"/>
                                    )}
                                </div>
                            )
                        }

                        {
                            touchedFields.username && (errors.username || usernameStatus.message) && (
                                <div className={`text-sm font-light ${usernameStatus.isValid ? 'text-green-500' : 'text-[#FF3939]'}`}>
                                    {errors.username?.message || usernameStatus.message}
                                </div>
                            )
                        }
                    </div>


                    {error && <div>{error}</div>}

                    <div className="mt-4">
                        <hr />
                        <div className="w-full flex justify-end items-center mt-6 font-bold">
                            <Button text={`${loading ? "Saving..." : "Save"}`} disabled={loading} dark mobileFull/>
                        </div>
                    </div>
                </div>

            </form>
        </div>
     );
}
 
export default ProfileForm;