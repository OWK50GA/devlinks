'use client'

import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type EditorButtonProps = {
    text: string,
    dark: boolean,
}

const EditorButton = ({ text, dark }: EditorButtonProps) => {

    const context = useAuth();
    const currentUser = context?.currentUser;

    if (!currentUser) {
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