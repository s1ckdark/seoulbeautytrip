'use client';
import React, { useEffect, useState, useRef, createRef, RefObject } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, Marker, useMap } from 'react-naver-maps';
import { useAtom, useAtomValue } from 'jotai';
import { markerDataMapAtom, initialCenterAtom, detailToggleAtom, detailMapAtom } from '@/stores';
import Loading from '@/components/Loading';
import styles from './NaverMap.module.scss';
import MarkerCluster from './MarkerCluster';
import NaverMarker from './Marker';
import MapView from '@/components/Doc/MapView';

const NCPMap = ({ data }: any) => {
    const navermaps = useNavermaps();
    const [map, setMap] = useState<any>(undefined);
    const [mapView, setMapView] = useState<any>(undefined);
    const nmap = useMap()
    const [initCenter, setInitCenter] = useAtom(initialCenterAtom);
    const [detailToggle, setDetailToggle] = useAtom(detailToggleAtom);
    const [detailMap, setDetailMap] = useAtom(detailMapAtom);
    const markerRefs: any = useRef(data.map(() => createRef()));

    const arrLength = data.length;
    const [elRefs, setElRefs] = useState<RefObject<naver.maps.Marker>[]>([]);

    if (!data) return <Loading />;
    const viewDetail = (item: any) => {
        setDetailToggle(true);
        setDetailMap(item);
    }
    useEffect(() => {
        setElRefs((elRefs) =>
            Array(arrLength)
                .fill(null)
                .map((_, i) => elRefs[i] || createRef()),
        );
    }, [arrLength]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setInitCenter([latitude, longitude]);
            }, (error) => {
                console.error("Geolocation error:", error);
            });
        }
        map?.setCenter(new navermaps.LatLng(initCenter[0], initCenter[1]));
    }, [])
    const onMarkerClick = (item: any) => {
        map?.panTo(new navermaps.LatLng(parseFloat(item.coords[0]), parseFloat(item.coords[1])));
        new navermaps.InfoWindow({
            content: "<div class='" + styles.pin + "'><button onClick=" + viewDetail(item) + ">" + item.title + "</button></div>",
            backgroundColor: "#fff",
            borderColor: "#f26522",
            maxWidth: 400,
            anchorSize: new navermaps.Size(10, 10),
            anchorSkew: true,
            anchorColor: "#fff",
            pixelOffset: new navermaps.Point(20, -20),
        }).open(map, new navermaps.LatLng(parseFloat(item.coords[0]), parseFloat(item.coords[1])));

    }

    if (!initCenter && !data) return <Loading />


    return (

        <MapDiv style={{ width: '100vw', height: 'calc(100vh - 112px)' }}>
            <NaverMap
                defaultCenter={new navermaps.LatLng(initCenter[0], initCenter[1])}
                defaultZoom={14}
                zoomControl={true}
                zoomControlOptions={{
                    position: navermaps.Position.TOP_LEFT,
                    style: navermaps.ZoomControlStyle.SMALL,
                }}
                ref={setMap}
            >
                <Marker
                    position={new navermaps.LatLng(initCenter[0], initCenter[1])}
                />
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
            {detailToggle && <MapView data={mapView} />}
        </MapDiv >
    );
}

export default NCPMap;