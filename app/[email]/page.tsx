import Button from "@/components/Button";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { platformConfig } from "@/utils/linksOptions";
import EditorButton from "@/components/EditorButton";
import ShareButton from "@/components/ShareButton";
import { Metadata, ResolvingMetadata } from "next";
import { use } from "react";

type PreviewPageProps = {
    params: {
        email: string;
    }
}

type Link = {
    platform: string,
    link: string
}

export async function generateMetadata (
    { params }: PreviewPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { email } = params
    const uniqueValue = decodeURIComponent(email)

    const q = query(collection(db, 'users'), where('email', '==', uniqueValue));
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
        return {
            title: 'User Not Found'
        }
    }

    const userData = querySnapshot?.docs?.[0]?.data();

    return {
        title: `${userData?.firstname} ${userData?.lastname} - Devlinks`,
        description: `Meet ${userData?.firstname} on Devlinks`,
        openGraph: {
            title: `${userData?.firstname} ${userData?.lastname} - Devlinks`,
            description: `Meet ${userData?.firstname} on Devlinks`,
            images: [
                {
                    url: userData?.profilePicture || null,
                    width: 1200,
                    height: 630,
                    alt: `Profile of ${userData?.firstname} ${userData?.lastname}`
                }
            ]   
        },
        twitter: {
            card: 'summary_large_image',
            title: `${userData?.firstname} ${userData?.lastname} - Devlinks`,
            description: `Meet ${userData?.firstname} on Devlinks`,
            images: [userData?.profilePicture || null]
        },
    }
}

const PreviewPage = async ({params}: PreviewPageProps) => {

    const { email } = params;
    const uniqueValue = decodeURIComponent(email)

    const q = query(collection(db, 'users'), where('email', '==', uniqueValue));
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
        return <p>User Not found</p>
    }

    const userData = querySnapshot?.docs?.[0]?.data();

    return ( 
        <div>
            {/* <head>
                <meta property="og:image" content={userData?.profilePicture}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
            </head> */}
            <div className="bg-transparent sm:bg-[#633cff] rounded-b-xl w-full h-fit md:h-72 p-4">
                <nav className="flex p-4 bg-white rounded-md justify-between">
                    <div>
                        <EditorButton text="&#8592; Editor" dark={false}/>
                    </div>
                    <ShareButton uniqueValue={`${uniqueValue}`} userData={userData}/>
                </nav>            
            </div>

            <div className="md:fixed md:top-[23%] md:left-[38.5%] bg-white px-10 py-5 md:py-10 flex flex-col rounded-lg w-4/5 mx-auto md:w-[23%] h-fit">
                <div className="border-4 border-[#633cff] rounded-full w-34 h-34 mx-auto flex items-center">
                    <div
                        className="rounded-full w-28 md:w-32 h-28 md:h-32 mx-auto flex items-center text-white"
                        style={{
                            backgroundImage: userData?.profilePicture ? `url(${userData.profilePicture})`: ``,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                    </div>
                </div>

                <div className="self-center mt-3 md:mt-5 flex flex-col gap-1 md:gap-2">
                    <p className="text-center font-bold md:text-2xl text-xl">
                        {userData?.firstname} {userData?.lastname}  
                    </p>
                    <p className="text-center font-light md:text-sm text-xs">
                        {userData?.email}
                    </p>
                </div>

                {
                    userData?.links? 
                    <div className="flex flex-col gap-4 mt-5 max-h-[45vh] md:max-h-[40vh] overflow-y-scroll">
                        {
                            userData?.links?.map((link: Link) => {
                                const platformConfigArray = Object.values(platformConfig)
                                const platform = platformConfigArray.find((platform) => link.platform === platform.name)
                                const PlatformIcon = platform?.icon
                                const platformColor = platform?.color
                                const platformName = platform?.name
                                return (
                                    <button 
                                        key={link.platform} className={` w-full px-3 py-3 md:py-4 rounded-lg`}
                                        style={{
                                            backgroundColor: platformColor ? platformColor : '',
                                            color: platformName !== 'Frontend Mentor'? 'white' : ''
                                        }}
                                    >
                                        <a href={`${link.link}`} target="_blank" className="flex justify-between items-center">
                                            <p className="flex items-center justify-start gap-2">
                                                {PlatformIcon && <PlatformIcon />}
                                                {link.platform}
                                            </p>
                                            <p>
                                                &#8594;
                                            </p>
                                        </a>
                                    </button>
                                )
                            })
                        }
                    </div>
                    :
                    <div>
                        No links found
                    </div>
                }

            </div>
        </div>
     );
}

// export const getServerSideProps: GetServerSideProps =async (context) => {
//     const collectionName = 'users'
//     const { email } = context.params;
//     const fieldName = 'email'
//     const uniqueValue = email;

//     const q = query(collection(db, collectionName), where(fieldName, '==', uniqueValue));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//         return {
//             notFound: true,
//             // redirect('/login');
//         }
//     }

//     const userData = querySnapshot.docs[0].data();

//     return {
//         props: {
//             userData,
//         },
//     };
// };
 
export default PreviewPage;