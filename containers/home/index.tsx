// import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchData } from '@/firebase/firestore/getDoc'
// import { useAtom } from "jotai";
// import { initialCenterAtom, markerDataMapAtom } from '@/stores';
import Loading from "@/components/Loading";

const NCPMap = dynamic(() => import('@/components/Map/NaverMap'), {
    ssr: false,
});

async function getData() {
    const response = await fetchData('marker');
    const { result } = await response;
    return result;
}

const Home = async () => {
    const markerData = await getData();

    if (!markerData) return <Loading />;
    return (
        <>
            {markerData && <NCPMap data={markerData} />}
        </>
    );
};

export default Home;
