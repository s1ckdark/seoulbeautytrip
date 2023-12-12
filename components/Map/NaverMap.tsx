import React, { useEffect, useState, useRef, createRef, RefObject } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, Marker, useMap } from 'react-naver-maps';
import { useAtom, useAtomValue } from 'jotai';
import { markerDataMapAtom, initialCenterAtom } from '@/stores';
import Loading from '@/components/Loading';
import './NaverMap.module.scss';
import styles from './NaverMap.module.scss';
import MarkerCluster from './MarkerCluster';
import NaverMarker from './Marker';
import { Toast } from '@/components/Toastify';
import { fetchData } from '@/firebase/firestore/getDoc';


const NCPMap = () => {
    const currentLocation = useAtomValue(initialCenterAtom);
    const navermaps = useNavermaps();
    const [map, setMap] = useState<naver.maps.Map | null>(null);
    const nmap = useMap()
    const [initCenter, setInitCenter] = useAtom(initialCenterAtom);
    const data = useAtomValue(markerDataMapAtom);
    if (!data) return <Loading />;

    const markerRefs: any = useRef(data.map(() => createRef()));

    const arrLength = data.length;
    const [elRefs, setElRefs] = useState<RefObject<naver.maps.Marker>[]>([]);

    useEffect(() => {
        // add or remove refs
        setElRefs((elRefs) =>
            Array(arrLength)
                .fill(null)
                .map((_, i) => elRefs[i] || createRef()),
        );
    }, [arrLength]);

    const onMarkerClick = (item: any) => {
        console.log(item);
        console.log(navermaps);
        Toast("success", item.title);
        map?.panTo(new navermaps.LatLng(parseFloat(item.coords[0]), parseFloat(item.coords[1])));

    }
    if (!currentLocation && !data) return <Loading />

    return (

        <MapDiv style={{ width: '100vw', height: 'calc(100vh - 70px)' }}>
            <NaverMap
                defaultCenter={new navermaps.LatLng(currentLocation[0], currentLocation[1])}
                defaultZoom={14}
                zoomControl={true}
                zoomControlOptions={{
                    position: navermaps.Position.TOP_LEFT,
                    style: navermaps.ZoomControlStyle.SMALL,
                }}
                ref={setMap}
            >
                <Marker position={new navermaps.LatLng(currentLocation[0], currentLocation[1])} />
                <MarkerCluster markers={elRefs} markerInfo={data} />
                {data.map((item: any, idx: number) => {
                    return (
                        <NaverMarker
                            ref={elRefs[idx]}
                            key={item.id}
                            navermaps={navermaps}
                            item={item}
                            onClick={onMarkerClick}
                        />
                    );
                })}

            </NaverMap>
        </MapDiv >
    );
}

export default NCPMap;