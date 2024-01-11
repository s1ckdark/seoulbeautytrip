
export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;

export type Coordinates = [Lat, Lng];

export interface markerType {
    title: any;
    company: string;
    contents: string;
    location: string;
    address: string;
    coords: string[];
    id: string;
    url: string[];
    lastModAt: Date;
}
export interface markerDataType {
    data: any[];
    lastDoc?: any;
    hasMore?: boolean;
}
