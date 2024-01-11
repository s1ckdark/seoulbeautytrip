import { Marker } from "react-naver-maps";
import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import styles from './NaverMap.module.scss';
interface Props {
    navermaps: typeof naver.maps;
    item: any;
    onClick: (item: string) => void;
}

// Wrap your component with React.forwardRef
const NaverMarker = React.forwardRef((props: Props, ref: any) => {
    const { item, navermaps, onClick } = props;
    const markerHtml = (name: string, isHighlighted: boolean = false) => {
        const className = isHighlighted ? styles.markerOuterhightlight : styles.markerOuter;
        const tmp = `<div class="${className}"><svg viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"/>
    </svg></div>`;
        return tmp;
    };
    return (
        <Marker
            ref={ref}
            position={new navermaps.LatLng(parseFloat(item.coords[0]), parseFloat(item.coords[1]))}
            icon={{
                content: [markerHtml(item.title)].join(''),
                scaledSize: new navermaps.Size(20, 20),
                origin: new navermaps.Point(0, 0),
            }}
            onClick={(e) => {
                e.pointerEvent.stopPropagation();
                onClick(item);
            }}
        />
    );
});

export default NaverMarker;
