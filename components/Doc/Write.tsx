'use client';
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { db, storage } from "@/firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { setData } from '@/firebase/firestore/addDoc';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, deleteObject, getStorage } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Toast } from "@/components/Toastify";
import imageCompression from "browser-image-compression";
import Styles from "./Write.module.scss";
import { useAtom } from 'jotai';
import { markerWriteDataAtom } from '@/stores';
import Preview from "@/components/Doc/Preview";

const Editor = dynamic(() => import('@/components/ToastEditor/ToastEditor'), {
    ssr: false
});

interface markerWriteData {
    id?: number;
    title?: string;
    content?: string;
    name?: string;
    address?: string;
    coord?: number[];
    url?: string[];
    lastModAt?: number;
}

interface FileWithPreview extends File {
    preview: string;
}

const Write: React.FC = () => {
    const { data: session } = useSession();
    const [file, setFile] = useState<FileWithPreview[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [state, setState] = useAtom(markerWriteDataAtom);
    const [addr, setAddr] = useState<string>('');
    const uref = useRef<any>(null);
    const router = useRouter();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const options = {
            maxSizeMB: 0.2, // 이미지 최대 용량
            maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
            useWebWorker: true,
        };
        try {
            let tmp: FileWithPreview[] = [];
            const files = e.target.files;
            if (files) {
                for (const image of files) {
                    const compressedFile = await imageCompression(image, options);
                    tmp.push({ ...compressedFile, preview: URL.createObjectURL(compressedFile) });
                }
                console.log(tmp);
                setFile([...file, ...tmp]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (e: any) => {
        e.preventDefault();
        try {
            setUploading(true);
            const urls = await Promise.all(
                file?.map((file) => {
                    return new Promise((resolve, reject) => {
                        const storageRef = ref(storage, "images/" + generateName() + '.' + file.type.substring(6, 10));
                        const task = uploadBytesResumable(storageRef, file);

                        task.on("state_changed",
                            (snapshot) => {
                                setProgress(
                                    Math.round(
                                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                    )
                                );
                            },
                            (error) => {
                                reject(error);
                            },
                            () => {
                                getDownloadURL(storageRef).then(resolve).catch(reject);
                            }
                        );
                    });
                })
            );
            console.log(urls);
            setState({
                ...state,
                url: [...state.url, ...urls]
            })
            Toast("success", "이미지 업로드가 완료되었습니다.");
        } catch (err) {
            console.error(err);
            Toast("error", "이미지 업로드 중 오류가 발생했습니다.");
        }
        // 초기화
        setProgress(0);
        setFile([]);
        setUploading(false);
    };



    const onSubmit = async () => {
        try {
            const { title, content, name, url, lastModAt } = state;
            console.log(state);
            await setData('marker', state.lastModAt.toString(), state).then((res) => {
                Toast('success', '포스트를 작성했습니다.', () => router.push('/marker/list'))
            })
        } catch (error) {
            Toast("error", (error as Error).message || '다시 시도해주세요.');
        }
    }

    const resetState = () => {
        setState({
            id: Date.now(),
            title: '',
            content: '',
            name: session?.user?.name || '',
            address: '',
            coord: [],
            url: [],
            lastModAt: Date.now()
        });
        setFile([]);
    }

    const onChange = (e: any) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    const onChangeEditor = () => {
        const editorHtml = uref.current.getInstance().getMarkdown();
        setState({
            ...state,
            content: editorHtml
        })
    }
    const generateName = () => {
        const randomName = uuid();
        return randomName;
    }

    useEffect(() => {
        resetState();
    }, []);

    const getAddress = (address: any) => {
        naver.maps.Service.geocode({ query: address }, function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
                return alert('Something wrong!');
            }
            var result = response.v2, // 검색 결과의 컨테이너
                items = result.addresses; // 검색 결과의 배열
            if (result.status === 'OK' && result.addresses.length > 0) {
                setState({
                    ...state,
                    address: items[0].roadAddress,
                    coord: [items[0].x, items[0].y]
                })
                Toast('success', '검색 결과가 저장되었습니다.')
            } else {
                Toast('error', '검색 결과가 없습니다.');
            }
        });
    }

    const onCancel = () => {
        router.back();
    }


    const { title, content, name, address, url, coord }: markerWriteData = state;
    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_MAP_CLIENT_ID}&submodules=geocoder`}
            />
            <div className={Styles.form}>
                <div className={`${Styles.inputGroup} ${Styles.title}`}>
                    <label htmlFor="title">제목</label>
                    <input name="title" className="border border-blue rounded" onChange={onChange} value={title} placeholder="제목을 입력하세요" title="제목" />
                </div>
                <div className={`${Styles.inputGroup} ${Styles.name}`}>
                    <label htmlFor="name">작성자 이름</label>
                    <input name="name" className="border border-blue rounded" onChange={onChange} value={name} placeholder="작성자 이름을 입력하세요" title="작성자 이름" />
                </div>
                <Editor
                    content={content || ' '}
                    editorRef={uref}
                    onChange={onChangeEditor}
                />

                <div className={`${Styles.inputGroup} ${Styles.image}`}>
                    <label htmlFor="image">이미지 파일</label>
                    <div className={Styles.uploadedImg}>
                        <input
                            multiple
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                            onClick={(e) => (e.target as HTMLInputElement).value = ''}
                            id="image" // Added label for attribute
                            placeholder="이미지 파일을 선택하세요" // Added placeholder attribute
                        />
                        <input type="button"
                            onClick={(e) => handleImageUpload(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-3" value="업로드" />
                    </div>
                </div>

                {state['url'] && state['url'].length > 0 && <Preview />}
                <div className={`${Styles.inputGroup} ${Styles.address}`}>
                    <label htmlFor="coord">주소</label>
                    <div className={Styles.addressSearch}>
                        <input type="text" className="border border-blue rounded" name="address" onChange={onChange} title="좌표" value={address} />
                        <input type="text" className="border border-blue rounded" name="coord" onChange={onChange} title="좌표" value={coord?.toString()} />
                        <input type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-3" value="주소 검색" onClick={() => getAddress(address)} />
                    </div>
                </div>
            </div>
            <div className="btnArea flex justify-center mt-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-3" onClick={onSubmit}>Write</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>Cancel</button>
            </div>
        </>
    )
}
export default Write;