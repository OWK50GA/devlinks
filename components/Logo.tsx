import Image from 'next/image'
import devlinks from '../public/solar_link-circle-bold.png'
import {instrumentSans} from '../utils/fonts'

const Logo = () => {
    return ( 
        <div className={`flex gap-1 items-center justify-center ${instrumentSans.className}`}>
            <Image src={devlinks} alt='devlinks'/>
            <p className='text-2xl font-[1000]'>devlinks</p>
        </div>
     );
}
 
export default Logo;