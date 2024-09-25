import {instrumentSans} from '../utils/fonts'

type ButtonProps = {
    text: string;
    dark: boolean;
    active?: boolean;
    disabled?: boolean;
    full?: boolean;
    clickHandler?: () => void;
}

const Button = (props: ButtonProps) => {

    const {text, disabled, full, clickHandler, active, dark} = props

    return ( 
        <button
            onClick={clickHandler}
            className={`${dark? 'bg-[#633cff] text-white':'border border-[#633cff] text-[#633cff]'} grid place-items-center rounded-lg ${disabled? 'bg-[#efebff]': ''} ${active? 'bg-[#beadff]':'' } ${full? 'w-[100%]':''}`}
        >
            <p className={'px-6 sm:px-10 whitespace-nowrap font-bold py-2 sm:py-3 ' + instrumentSans.className}>
                {text}
            </p>
        </button>
     );
}
 
export default Button;