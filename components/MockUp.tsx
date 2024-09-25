import Image from 'next/image'
import mockUp from '../public/preview-section.svg'

const MockUp = () => {
    return ( 
        <div className="bg-white h-screen p-6 flex justify-center items-center rounded-xl">
            <Image src={mockUp} alt='Mobile Preview'/>
        </div>
     );
}
 
export default MockUp;