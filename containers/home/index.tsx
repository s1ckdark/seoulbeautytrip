'use client';
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "@/components/Map";
import { useAtom } from "jotai";
import { initialCenterAtom, markerDataMapAtom } from '@/stores';
import { fetchData } from '@/firebase/firestore/getDoc';
import Loading from "@/components/Loading";

const NCPMap = dynamic(() => import('@/components/Map/NaverMap'), {
    ssr: false,
});

const Home = () => {
    const [initCenter, setInitCenter] = useAtom(initialCenterAtom);
    const [data, setData] = useAtom(markerDataMapAtom);

    if (!data) return <Loading />;
    useEffect(() => {
        // Fetching user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setInitCenter([latitude, longitude]);
            }, (error) => {
                console.error("Geolocation error:", error);
            });
        }

        // Fetching marker data
        const fetchMarkerData = async () => {
            const response = await fetchData('marker');
            const { result, error }: { result: any, error: any } = response;
            if (result) {
                setData(result);
            }
        };

        fetchMarkerData();
    }, []);

    return (
        <>
            {/* <Map
                mapId={"myMap"}
                initialCenter={initCenter as [number, number]}
                initialZoom={initialZoom}
                onLoad={(map) => console.log("Map loaded!", map)}
            /> */}
            <NCPMap />
        </>
    );
};

export default Home;
