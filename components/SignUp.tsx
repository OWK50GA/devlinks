import { instrumentSans } from '../utils/fonts'
import { PiEnvelopeSimpleFill } from 'react-icons/pi';
import { BiSolidLock } from 'react-icons/bi';
import Button from './Button';
import Logo from './Logo';
import Link from 'next/link';

const SignUp = () => {
    return ( 
        <div className={'flex flex-col justify-center items-center mt-[5%] w-full m-auto gap-9' + ' ' + instrumentSans.className}>
            <Logo />
            <div className='bg-white w-[500px] p-10 rounded-xl'>
                <div className='flex flex-col gap-4'>
                    <p className='text-2xl font-[1000]'>Create Account</p>
                    <p className='text-gray-600'>Let's get you started sharing your links</p>
                </div>
                <form action="">
                    <div className='mt-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="email" className='text-xs'>Email Address</label>
                            <span className='flex border items-center justify-start gap-4 h-10 rounded-lg p-4'>
                                <PiEnvelopeSimpleFill className='text-gray-600'/>
                                <input type="email" className='outline-none' placeholder='e.g. alex@email.com'/>
                                <div></div>
                            </span>
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Create password</label>
                            <span className='flex border items-center justify-start gap-4 h-10 rounded-lg p-4'>
                                <BiSolidLock className='text-gray-600'/>
                                <input type="password" className='outline-none' placeholder='At least 8 characters'/>
                                <div></div>
                            </span>
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Confirm password</label>
                            <span className='flex border items-center justify-start gap-4 h-10 rounded-lg p-4'>
                                <BiSolidLock className='text-gray-600'/>
                                <input type="password" className='outline-none' placeholder='At least 8 characters'/>
                                <div></div>
                            </span>
                        </div>

                        <div className='w-fit mt-3 text-xs text-gray-600'>
                            <p>Password must contain at least 8 characters</p>
                        </div>

                        <div>
                            <Button text='Create new account' full dark/>
                        </div>

                    </div>
                </form>

                <div className='w-fit mx-auto mt-4 text-sm text-gray-600'>
                    <p>Already have an account? <span className='text-purple-600'><Link href={'login'}>Login</Link></span></p>
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;