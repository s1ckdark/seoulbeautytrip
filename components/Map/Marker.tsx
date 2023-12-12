import { Marker } from "react-naver-maps";
import React from "react";
import { RiMapPin2Fill } from "react-icons/ri";
interface Props {
    navermaps: typeof naver.maps;
    item: any;
    onClick: (item: string) => void;
}

// Wrap your component with React.forwardRef
const NaverMarker = React.forwardRef((props: Props, ref: any) => {
    const { item, navermaps, onClick } = props;
    return (
        <Marker
            ref={ref}
            position={new navermaps.LatLng(parseFloat(item.coords[0]), parseFloat(item.coords[1]))}
            // icon={{
            //     url: iconUrl,
            //     content: `<RiMapPin2Fill />`,
            //     scaledSize: new navermaps.Size(20, 20),
            //     origin: new navermaps.Point(0, 0),
            // }}
            onClick={(e) => {
                e.pointerEvent.stopPropagation();
                onClick(item);
            }}
        />
    );
});

export default NaverMarker;
