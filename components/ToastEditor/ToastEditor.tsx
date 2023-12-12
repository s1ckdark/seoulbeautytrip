'use client';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NextPage } from 'next';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebaseConfig";
import imageCompression from "browser-image-compression";
import { v4 as uuid } from 'uuid';

interface EditorProps {
    content: string;
    editorRef: React.MutableRefObject<any>;
    onChange: () => void;
    props: any;
}

interface header {
    header: string;
}


const ToastEditor: NextPage<EditorProps> = ({ content, editorRef, onChange, props }) => {

    const [html, setHtml] = useState('');
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync']
    ];

    useEffect(() => {
        const editorIns = editorRef.current.getInstance();
        editorIns.removeHook("addImageBlobHook");
        editorIns.addHook('addImageBlobHook', addImage);
    }, []);

    const addImage = async (blob: any, dropImage: any) => {
        const img = await compressImg(blob);
        const url = await uploadImage(img);
        dropImage(url, 'alt_text');
    }

    const uploadImage = async (blob: any) => {
        try {
            const storageRef = ref(storage, `images/${generateName() + '.' + blob.type.substring(6, 10)}`);
            //firebase upload const snapshot = await uploadBytes(storageRef, blob); 

            return await getDownloadURL(storageRef);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    //이미지 압축 
    const compressImg = async (blob: any) => {
        try {
            const options = {
                maxSize: 1,
                initialQuality: 0.55 //initial 0.7 
            }
            return await imageCompression(blob, options);
        } catch (e) { console.log(e); }
    }

    //랜덤 파일명 생성 
    const generateName = () => {
        const randomName = uuid;
        return randomName;
    }

    const getContent = () => { //글 내용 HTML 문자열로 불러오기 
        const editorIns = editorRef.current.getInstance();
        return editorIns.getHTML();
    }

    const getMarkDown = () => { //글 내용 마크다운 문자열로 불러오기 
        const editorIns = editorRef.current.getInstance();
        return editorIns.getMarkdown();
    }



    return (
        <>
            {editorRef && (
                <Editor
                    height="600px"
                    initialEditType="wysiwyg"
                    initialValue={content || ' '}
                    previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
                    ref={editorRef}
                    theme={''}
                    usageStatistics={false}
                    toolbarItems={toolbarItems}
                    useCommandShortcut={true}
                    placeholder="내용을 입력해주세요."
                    onChange={onChange}
                    // plugin={[colorSyntax]}
                    hideModeSwitch={true}
                    {...props}
                // hooks={{ addImageBlobHook: onUploadImage }}
                />
            )}
        </>
    );
}
export default ToastEditor;
