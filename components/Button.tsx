import {instrumentSans} from '../utils/fonts'

type ButtonProps = {
    text: string;
    dark: boolean;
    active?: boolean;
    disabled?: boolean;
    full?: boolean;
    mobileFull?: boolean;
    clickHandler?: () => void;
}

const Button = (props: ButtonProps) => {

    const {text, disabled, full, clickHandler, active, dark, mobileFull} = props

    return ( 
        <button
            onClick={clickHandler}
            disabled={disabled}
            className={`${dark? 'bg-[#633cff] text-white hover:bg-[#beadff]':'border border-[#633cff] text-[#633cff] hover:bg-[#efebff]'} grid place-items-center rounded-lg ${disabled? 'bg-[#beadff]': ''} ${active? 'bg-[#beadff]':'' } ${full? 'md:w-[100%]':'md:w-auto'} ${mobileFull ? 'w-[100%]': 'w-auto'}`}
        >
            <p className={'px-6 sm:px-10 whitespace-nowrap font-bold py-2 sm:py-3 text-center text-balance ' + instrumentSans.className}>
                {text}
            </p>
        </button>
     );
}
 
export default Button;