'use client';
import React from 'react';
import Styles from './MapView.module.scss';
import { getDateKST } from '@/utils';
import Carousel from '@/components/Carousel';
import { useRouter, usePathname } from 'next/navigation';
import { markerDataAtom, detailToggleAtom, detailMapAtom } from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import { markerDataType } from '@/types';
import Loading from '@/components/Loading';
import delDocument from "@/firebase/firestore/delDoc";

const MapView = (data: any) => {
    const [detialToggle, setDetailToggle] = useAtom(detailToggleAtom);
    const [detailMap, setDetailMap] = useAtom(detailMapAtom);
    const { title, company, content, location, address, coords, id, url, lastModAt }: any = detailMap;
    const router = useRouter();

    console.log(detailMap);
    const closeBtn = () => {
        setDetailToggle(false);
        setDetailMap({});
    }
    if (!data) return <Loading />;
    return (
        <div className={Styles.container}>
            <div className={Styles.closeBtn} onClick={() => closeBtn()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
            <div className={Styles.portfolioView}>
                <h1 className={Styles.title}>{title}</h1>
                {url && <Carousel images={url} title={title} />}
                <div className={Styles.details}>
                    <label className={Styles.label}>Address</label>
                    <p className={Styles.address}>{address}</p>
                    <label className={Styles.label}>Content</label>
                    <p className={Styles.content}>{content}</p>
                    <label className={Styles.label}>Location</label>
                    <p className={Styles.locationt}>{location}</p>
                    <label className={Styles.label}>Last Modified</label>
                    <p className={Styles.lastModAt}>{getDateKST(lastModAt)}</p>
                </div>
                {/* <div className={`${Styles.btnArea} mt-5`}>
                <button className="edit backButton text-white font-bold py-2 px-4 me-2 rounded">수정</button>
                <button type="button" className="delete backButton text-white font-bold py-2 px-4 rounded me-2" onClick={()=> delDocument({collection:"marker", id:id})}>삭제</button>
                <button type="button" className="backButton text-white font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</button>
            </div> */}
            </div>
        </div>
    );
};

export default MapView;