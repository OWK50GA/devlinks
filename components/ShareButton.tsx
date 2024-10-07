'use client'

import Button from "./Button";

type ShareButtonProps = {
    userData: {
        [key: string]: any
    };
    uniqueValue: string;
}

const ShareButton = ({userData, uniqueValue}: ShareButtonProps) => {

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: `${userData?.firstname} ${userData?.lastname} - Devlinks`,
                text: `Meet ${userData?.firstname} on Devlinks`,
                url: `/${uniqueValue}`
            })
            .catch((err) => {
                console.error(`An error occured: ${err}`)
                alert('Web Share API not supported in your browser. Copy Search Route manually instead')
            })
        }
    }

    return ( 
        <div>
            <Button dark text="Share Link" clickHandler={handleShare}/>
        </div>
     );
}
 
export default ShareButton;