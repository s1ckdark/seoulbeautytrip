import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import React from 'react';

interface ViewProps {
    content: string;
    editorRef: React.MutableRefObject<any>;
    props: any;
}

const ToastViewer: React.FC<ViewProps> = ({ content, editorRef, props }) => {
    return (
        <>
            {editorRef && (
                <Viewer
                    initialValue={content || ' '}
                    ref={editorRef}
                />
            )}
        </>
    );
}

export default ToastViewer;
