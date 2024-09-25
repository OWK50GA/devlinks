import { instrumentSans } from '../utils/fonts'
import { PiEnvelopeSimpleFill } from 'react-icons/pi';
import { BiSolidLock } from 'react-icons/bi';
import Button from './Button';
import Logo from './Logo';
import Link from 'next/link';


const Login = () => {
    return ( 
        <div className={'flex flex-col justify-center items-center mt-[10%] w-full m-auto gap-9' + ' ' + instrumentSans.className}>
            <Logo />
            <div className='bg-white w-[500px] p-10 rounded-xl'>
                <div className='flex flex-col gap-4'>
                    <p className='text-2xl font-[1000]'>Login</p>
                    <p className='text-gray-600'>Add your details to get back into the app</p>
                </div>
                <form action="">
                    <div className='mt-6 flex flex-col gap-6'>
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="email" className='text-xs'>Email Address</label>
                            <span className='flex border items-center justify-start gap-4 h-10 rounded-lg p-4'>
                                <PiEnvelopeSimpleFill className='text-gray-600'/>
                                <input type="text" className='outline-none' placeholder='e.g. alex@email.com'/>
                                <div></div>
                            </span>
                        </div>

                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="password" className='text-xs'>Password</label>
                            <span className='flex border items-center justify-start gap-4 h-10 rounded-lg p-4'>
                                <BiSolidLock className='text-gray-600'/>
                                <input type="text" className='outline-none' placeholder='Enter your password'/>
                                <div></div>
                            </span>
                        </div>

                        <div>
                            <Button text='Login' full dark/>
                        </div>

                    </div>
                </form>

                <div className='w-fit mx-auto mt-4 text-sm text-gray-600'>
                <p>Don't have an account? <span className='text-purple-600'><Link href={'signup'}>Sign Up</Link></span></p>
                </div>
            </div>
        </div>
     );
}
 
export default Login;