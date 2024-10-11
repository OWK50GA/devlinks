'use client'

import { instrumentSans } from '../utils/fonts'
import { PiEnvelopeSimpleFill } from 'react-icons/pi';
import { BiSolidLock } from 'react-icons/bi';
import Button from './Button';
import Logo from './Logo';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from './Loading';

const LoginSchema = z.object({
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(8, 'At least 8 characters'),
})

type LoginSchemaData = z.infer<typeof LoginSchema>;


const Login = () => {

    const context = useAuth();
    const login = context?.login;
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<LoginSchemaData>({
        resolver: zodResolver(LoginSchema)
    })
    
    const submitHandler = (values: LoginSchemaData) => {
        setLoading(true)
        login(values.email, values.password)
        .then(() => {
            reset
            setLoading(false)
            router.push('/user/profile')
        }).catch((err) => {
            console.error('Error occured Logging in: ', err.message)
            setError(`Error occured Logging in: , ${err.message}`)
            setLoading(false)
        })
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return ( 
        <div className={`flex flex-col justify-center items-center mt-[10%] w-full m-auto gap-9 ${instrumentSans.className}`}>
            <Logo />
            <div className='bg-white w-fit md:w-[500px] p-10 rounded-xl'>
                <div className={'flex flex-col gap-4 ' + instrumentSans.className}>
                    <p className='text-2xl font-[1000]'>Login</p>
                    <p className='text-gray-600'>Add your details below to get back into the app</p>
                </div>
                <form action="" onSubmit={handleSubmit(submitHandler)}>
                    <div className='mt-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="email" className='text-xs'>Email Address</label>
                            <span className={`flex border items-center justify-start gap-4 h-10 rounded-lg p-4 focus-within:border-[#633cff] ${errors.email ? 'border-[#FF3939]': ''}`}>
                                <PiEnvelopeSimpleFill className='text-gray-600'/>
                                <input 
                                    type="text" 
                                    className='outline-none' 
                                    placeholder='e.g. alex@email.com'
                                    {...register('email')}
                                />
                                <div className='hidden md:flex text-sm text-[#FF3939] font-light'>
                                    {errors.email ? errors.email.message : ''}
                                </div>
                            </span>
                            <div className='flex md:hidden text-sm text-[#FF3939] font-light'>
                                {errors.email ? errors.email.message : ''}
                            </div>
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Password</label>
                            <span className={`flex border items-center justify-start gap-4 h-10 rounded-lg p-4 focus-within:border-[#633cff] ${errors.password ? 'border-[#FF3939]': ''}`}>
                                <BiSolidLock className='text-gray-600'/>
                                <input 
                                    type="password" 
                                    className='outline-none' 
                                    placeholder='Enter your password'
                                    {...register('password')}
                                />
                                <div className='hidden md:flex text-sm text-[#FF3939] font-light'>
                                    {errors.password? errors.password.message : ''}
                                </div>
                            </span>
                            <div className='flex md:hidden text-sm text-[#FF3939] font-light'>
                                {errors.password? errors.password.message : ''}
                            </div>
                        </div>

                        <div>
                            <Button text={!loading? 'Login' : 'Logging in...'} disabled={loading} full dark mobileFull/>
                        </div>

                    </div>
                </form>

                <div className='mx-auto mt-4 text-sm text-gray-600 w-4/6 md:w-fit text-center'>
                    <p>
                        Don't have an account? <br className='md:hidden'/>
                        <span className='text-[#633cff]'>
                            <Link href={'signup'}>
                                Create Account
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
            {error && <div className='text-sm text-[#FF3939] font-light'>{error}</div>}
        </div>
     );
}
 
export default Login;