// 'use client';
// import Script from "next/script";
// import { useState, useEffect, useRef } from "react";
// import { NaverMap, Coordinates } from "@/types";
// // import { initialCenter } from "@/hooks/useMap";
// import Styles from "./index.module.scss";
// import { initialCenterAtom, markerDataMapAtom, markerViewDataAtom } from '@/stores';
// import { useAtom, useAtomValue } from 'jotai';
// import View from '@/components/Doc/View';
// import MarkerClustering from './markerClustering';

// interface MapProps {
//     mapId?: string;
//     initialCenter?: Coordinates;
//     initialZoom?: number;
//     onLoad?: (map: NaverMap) => void;
// }

// const Map: React.FC<MapProps> = ({ mapId = 'map', initialCenter, initialZoom, onLoad }) => {
//     const [data, setData] = useAtom(markerDataMapAtom);
//     const [viewData, setViewData] = useAtom(markerViewDataAtom);
//     const mapData = useAtomValue(markerDataMapAtom);
//     const [location, setLocation] = useAtom<number[]>(initialCenterAtom);
//     const mapRef = useRef<NaverMap | null>(null);
//     const markerRef = useRef<any | null>(null);
//     const selectedMarker = useRef<any | null>(null);
//     const map = mapRef.current || null;


//     const markerClickEvent = (marker: any, item: any) => {
//         naver.maps.Event.addListener(marker, 'click', (e: any) => {
//             if (!selectedMarker.current || (selectedMarker.current !== marker)) {
//                 const selectedName = data.find(
//                     (di: data) => di.marker === selectedMarker.current)?.title;

//                 if (selectedMarker.current) {
//                     selectedMarker.current.setIcon({
//                         content: markerHtml(selectedName, false),
//                         size: new naver.maps.Size(38, 58),
//                         anchor: new naver.maps.Point(19, 58),
//                     });
//                 }

//                 const selectedMarkerData = data.find(di => di.title === item.title ? di : null);
//                 setViewData(selectedMarkerData);
//                 marker.setIcon({
//                     content: markerHtml(item.title, true),
//                     size: new naver.maps.Size(38, 58),
//                     anchor: new naver.maps.Point(19, 58),
//                 });
//                 selectedMarker.current = marker;
//                 map.panTo(marker.getPosition());

//                 const infowindow = new naver.maps.InfoWindow({
//                     // content: <Portfolio data={selectedMarkerData} />,
//                     content: `<div id="infowindow" style="width:150px;text-align:center;padding:10px;"><img src=${selectedMarkerData.url[0]}/><p>${selectedMarkerData.title}</p><p>${selectedMarkerData.address}</p></div>`,
//                     borderWidth: 1,
//                     anchorSize: new naver.maps.Size(20, 24),
//                     pixelOffset: new naver.maps.Point(10, -10),
//                     position: marker.getPosition() + new naver.maps.Point(200, -100)
//                 });

//                 if (infowindow.getMap()) {
//                     infowindow.close();
//                 } else {
//                     infowindow.open(map, marker);
//                 }
//             }
//         })
//     }

//     const markerMove = () => {
//         data
//             ?.find((i: any) => i.id === item.id)
//             ?.marker?.trigger('click');
//     };

//     const initializeMap = () => {
//         console.log(location);
//         const mapOptions = {
//             center: new window.naver.maps.LatLng(...location),
//             zoom: initialZoom,
//             zoomControl: true,
//             minZoom: 9,
//             scaleControl: false,
//             mapDataControl: false,
//             logoControlOptions: {
//                 position: naver.maps.Position.BOTTOM_LEFT,
//             },
//         };

//         const map = new window.naver.maps.Map(mapId, mapOptions);
//         mapRef.current = map;

//         if (onLoad) {
//             onLoad(map);
//         }
//     };

//     const markerHtml = (name: string, isHighlighted: boolean = false) => {
//         const className = isHighlighted ? Styles.markerOuterhightlight : Styles.markerOuter;
//         return `<div class="${className}"><div><span>${name}</span></div></div>`;
//     };


//     useEffect(() => {
//         if (mapRef.current) {
//             const map = mapRef.current;
//             console.log(...location);
//             map.setCenter(new naver.maps.LatLng(...location));
//             const marker = new naver.maps.Marker({
//                 position: new window.naver.maps.LatLng(...location),
//                 map: map
//             });
//         }
//     }, [mapRef, location]);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         }

//         // 위치추적에 성공했을때 위치 값을 넣어줍니다.
//         function success(position: any) {
//             setLocation([position.coords.latitude, position.coords.longitude]);
//         }

//         // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
//         function error() {
//             setLocation([37.4979517, 127.0276188]);
//         }
//     }, []);

//     useEffect(() => {
//         const createMarker = () => {
//             data?.map((item: any) => {
//                 console.log(item);
//                 const marker = new naver.maps.Marker({
//                     position: new naver.maps.LatLng(
//                         parseFloat(item.coords[0]), parseFloat(item.coords[1])
//                     ),
//                     map: mapRef.current,
//                     icon: {
//                         content: markerHtml(item.title, false),
//                         size: new naver.maps.Size(38, 58),
//                         anchor: new naver.maps.Point(19, 58),
//                     },
//                 });

//                 markerClickEvent(marker, item);
//                 item.marker = marker;
//             });
//         }
//         createMarker();

//         const updateMarkers = (
//             isMap: naver.maps.Map,
//             isMarkers: naver.maps.Marker[]
//         ) => {
//             const mapBounds: any = isMap.getBounds();
//             let marker;
//             let position;

//             for (let i = 0; i < isMarkers.length; i += 1) {
//                 marker = isMarkers[i];
//                 position = marker.getPosition();

//                 if (mapBounds.hasLatLng(position)) {
//                     showMarker(isMap, marker);
//                 } else {
//                     hideMarker(marker);
//                 }
//             }
//         };

//         const showMarker = (isMap: naver.maps.Map, marker: naver.maps.Marker) => {
//             marker.setMap(isMap);
//         };

//         const hideMarker = (marker: naver.maps.Marker) => {
//             marker.setMap(null);
//         };

//     }, [location])

//     //맵이 unmount되었을 때 맵 인스턴스 destory하기 
//     useEffect(() => {
//         return () => {
//             mapRef.current?.destroy();
//         };
//     }, []);

//     return (
//         <>
//             <Script
//                 strategy="afterInteractive"
//                 type="text/javascript"
//                 src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_MAP_CLIENT_ID}`}
//                 onReady={initializeMap}
//             />
//             <div id={mapId} className={Styles.map}>
//                 {viewData && <View data={viewData} className={Styles.portfolio} />}
//             </div>
//         </>
//     )
// }
// export default Map;