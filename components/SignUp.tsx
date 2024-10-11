'use client'

import { instrumentSans } from '../utils/fonts'
import { PiEnvelopeSimpleFill } from 'react-icons/pi';
import { BiSolidLock } from 'react-icons/bi';
import Button from './Button';
// import { useForm } from "react-hook-form";
import Logo from './Logo';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from './Loading';
import { FaEye } from 'react-icons/fa6';

const signUpSchema = z.object({
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(8, 'At least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'At least one uppercase letter, one lowercase letter, one number and one special character'
        ),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

// Infer type of signup form values
type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUp = () => {

    const context = useAuth();
    const signup = context?.signup
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema)
    })

    const submitHandler = (values: SignUpFormValues) => {
        setLoading(true)
        signup(values.email, values.password)
        .then(() => {
            reset();
            router.push('/login')
            setLoading(false)
        }).catch((err) => {
            setError(`Error occured Signing Up: ${err.message}`)
            setLoading(false)
        })
    }

    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
    const handlePasswordType = () => {
        passwordType == 'password'? setPasswordType('text') : setPasswordType('password')
    }

    if (loading) {
        return (
            <div className='flex flex-col justify-center items-center mt-[25%]'>
                <Loading />
            </div>
        )
    }

    return ( 
        <div className={'flex flex-col justify-center items-center mt-[5%] w-full m-auto gap-9' + ' ' + instrumentSans.className}>
            <Logo />
            <div className='bg-white w-fit md:w-[500px] p-6 md:p-10 rounded-xl'>
                <div className='flex flex-col gap-4'>
                    <p className='text-2xl font-[1000]'>Create Account</p>
                    <p className='text-gray-600'>Let's get you started sharing your links</p>
                </div>
                <form action="" onSubmit={handleSubmit(submitHandler)}>
                    <div className='mt-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="email" className='text-xs'>Email Address</label>
                            <span className={`flex border items-center justify-start gap-4 h-10 rounded-lg p-4 focus-within:border-[#633cff] ${errors.email ? 'border-[#FF3939]': ''}`}>
                                <PiEnvelopeSimpleFill className='text-gray-600'/>
                                <input 
                                    type="email" 
                                    className='outline-none' 
                                    placeholder='e.g. alex@email.com'
                                    {...register("email")}
                                />
                                <div className='hidden md:flex text-xs md:text-sm text-[#FF3939] font-light'>
                                    {errors.email? errors.email.message : ''}
                                </div>
                            </span>
                            <div className='flex md:hidden text-xs md:text-sm text-[#FF3939] font-light'>
                                {errors.email? errors.email.message : ''}
                            </div>
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Create password</label>
                            <span className={`flex border items-center justify-start gap-4 h-10 rounded-lg p-4 focus-within:border-[#633cff] ${errors.password ? 'border-[#FF3939]': ''}`}>
                                <BiSolidLock className='text-gray-600'/>
                                <input 
                                    type={passwordType} 
                                    className='outline-none' 
                                    placeholder='At least 8 characters'
                                    {...register("password")}
                                />
                                <FaEye onClick={handlePasswordType}/>
                                <div className='hidden md:flex text-xs md:text-sm text-[#FF3939] font-light'>
                                    {errors.password ? (errors.password.type === 'min' ? errors.password.message : '') : ''}
                                </div>
                            </span>
                            <div className='flex md:hidden text-xs md:text-sm text-[#FF3939] font-light'>
                                {errors.password ? errors.password.message : ''}
                            </div>
                        </div>

                        {/* {
                            errors.password?.type === 'pattern'? 
                            <div>{errors.password?.message}</div>
                            : 
                            null
                        } */}

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Confirm password</label>
                            <span className={`flex border items-center justify-start gap-4 h-10 rounded-lg p-4 focus-within:border-[#633cff] ${errors.confirmPassword ? 'border-[#FF3939]': ''}`}>
                                <BiSolidLock className='text-gray-600'/>
                                <input 
                                    type={passwordType} 
                                    className='outline-none' 
                                    placeholder='At least 8 characters'
                                    {...register("confirmPassword")}
                                />
                                <FaEye onClick={handlePasswordType}/>
                                <div className='hidden md:flex text-xs md:text-sm text-[#FF3939] font-light'>
                                    {errors.confirmPassword ? errors.confirmPassword.message : ''}
                                </div>
                            </span>
                            <div className='flex md:hidden text-xs md:text-sm text-[#FF3939] font-light'>
                                {errors.confirmPassword? errors.confirmPassword.message : ''}
                            </div>
                        </div>

                        <div className='w-fit mt-3 text-xs text-gray-600'>
                            <p>Password must contain at least 8 characters</p>
                        </div>

                        {/* <div className='hidden md:flex text-xs md:text-sm text-[#FF3939] font-light'>
                            {errors.confirmPassword?.type === 'custom'? errors.confirmPassword.message : ''}
                        </div> */}

                        <div className='hidden md:flex text-xs md:text-sm text-[#FF3939] font-light'>
                            {errors.password?.type !== 'min' ? errors.password?.message : ''}
                        </div>

                        <div>
                            <Button text={!loading? 'Create new account' : 'Creating new account'} disabled={loading} full dark mobileFull/>
                        </div>

                    </div>
                </form>

                <div className='w-3/5 md:w-fit mx-auto mt-4 text-sm text-gray-600 text-center'>
                    <p>Already have an account? <span className='text-[#633cff]'><Link href={'login'}>Login</Link></span></p>
                </div>
            </div>
            {error && <div className='text-xs md:text-sm text-[#FF3939] font-light'>{error}</div>}
        </div>
     );
}
 
export default SignUp;