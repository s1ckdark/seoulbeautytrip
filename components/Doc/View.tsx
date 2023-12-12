import React from 'react';
import Styles from './View.module.scss';
import { getDateKST } from '@/utils';
import Carousel from '@/components/Carousel';
import { useRouter } from 'next/navigation';
const View = ({ data, className }: any) => {
    const { url, coord, id, title, lastModAt, address, name, content } = data;
    const router = useRouter();
    return (

        <div className={`${className} portfolio-view`}>
            <div className={Styles.container}>
                <h1 className={Styles.title}>{title}</h1>
            </div>
            <Carousel images={url} title={title} />
            <div className={`${Styles.details} ${Styles.container}`}>
                <p className={Styles.address}><strong>Address:</strong> {address}</p>
                <p className={Styles.content}><strong>Content:</strong> {content}</p>
                <p className={Styles.lastModAt}><strong>Last Modified:</strong> {getDateKST(lastModAt)}</p>
            </div>
            <div className={`${Styles.buttonArea} ${Styles.container}`}>
                <button type="button" className="backButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</button>
            </div>
        </div >
    );
};

export default View;