'use client'

import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type EditorButtonProps = {
    text: string,
    dark: boolean,
    uniqueValue: string
}

const EditorButton = ({ text, dark, uniqueValue }: EditorButtonProps) => {

    const context = useAuth();
    const userDataObj = context?.userDataObj;

    if (userDataObj?.email !== uniqueValue) {
        return (
            <Link href={'/login'}>
                <Button text="Login" dark={false}/>
            </Link>
        )
    }

    return  (
        <Link href={`/user`}>
            <Button text={text} dark={dark}/>
        </Link>
    )
}

export default EditorButton;