import { storage } from "@/firebase/firebaseConfig";
import { useState, useEffect } from "react";
import Image from "next/image"

import { ref, getDownloadURL, } from "firebase/storage";

export default function Images({ imageurl }: any) {

    const [imgurl, setImgurl] = useState();


    useEffect(() => {
        const func = async () => {
            if (imageurl !== undefined) {
                const reference = ref(storage, imageurl);
                await getDownloadURL(reference).then((x: any) => {
                    console.log(x);
                    setImgurl(x);
                })
            }
        }
        func();
    }, []);

    const defaultImgUrl = ""; // Add a default value for imgurl

    return (
        <div>
            <Image unoptimized={true} alt="text" width={0} height={0} style={{ width: '100%', height: 'auto' }} src={imgurl || defaultImgUrl} />
        </div>
    )
}