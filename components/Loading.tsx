import { TbLoader3 } from "react-icons/tb";

const Loading = () => {
    return ( 
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
            <TbLoader3 className="animate-spin text-4xl sm:text-5xl"/>
        </div>
     );
}
 
export default Loading;