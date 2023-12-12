import { Container as MapDiv, NaverMap, Marker, useNavermaps, Overlay, useMap } from 'react-naver-maps'
import { makeMarkerClustering } from './markerClustering'
import { useState, useEffect, RefObject } from 'react'
import { useAtom, useAtomValue } from 'jotai';
import { markerDataMapAtom, initialCenterAtom } from '@/stores';
import useNaverMap from '@/hooks/useNaverMap';



const MarkerCluster = ({ markers, markerInfo }: { markers: RefObject<naver.maps.Marker>[]; markerInfo: any[] }) => {
    const navermaps = useNavermaps();
    const map = useMap();
    const data = useAtomValue(markerDataMapAtom);
    const { htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5 } = useNaverMap(navermaps);

    const MarkerClustering = makeMarkerClustering(window.naver);
    const getCluster = () => {
        const markerList = markers.map((_marker) => {
            return _marker.current;
        });

        const cluster = new MarkerClustering({
            minClusterSize: 2,
            maxZoom: 14, // 조절하면 클러스터링이 되는 기준이 달라짐 (map zoom level)
            map: map,
            markers: markerList.filter((marker) => marker),
            disableClickZoom: false,
            gridSize: 120,
            icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
            indexGenerator: [5, 10, 15, 20, 30],
            stylingFunction: function (clusterMarker: any, count: number) {
                clusterMarker.getElement().querySelector('div:first-child').innerText = count;
            },
        });

        return cluster;
    }

    const [cluster, setCluster] = useState(getCluster());

    useEffect(() => {
        setCluster(getCluster());
    }, [data]);

    return (
        <>
            <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />
        </>
    );
}
export default MarkerCluster;