
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { markerDataAtom } from '@/stores';
import Listing from '@/components/Doc/List';
import { fetchDataWithPage } from '@/firebase/firestore/getDoc';
import Styles from './List.module.scss';

// Assuming the structure of your marker data, you might need to adjust these types
interface MarkerData {
    data: any[]; // Replace 'any' with a more specific type for your data items
    lastDoc: any; // Define the type for your lastDoc (e.g., Firestore DocumentSnapshot)
    hasMore: boolean;
}

const List: React.FC = () => {
    const [data, setData] = useAtom(markerDataAtom);
    const pageSize = 2;

    const fetchFirstPage = async () => {
        const { result, error } = await fetchDataWithPage('marker', pageSize, null);
        if (result) {
            setData({ data: result.data, lastDoc: result.lastVisible, hasMore: result.data.length === pageSize });
        } else if (error) {
            console.error(error);
        }
    };

    const fetchNextPage = async () => {
        if (!('lastDoc' in data) || !('hasMore' in data)) return;

        const { result, error } = await fetchDataWithPage('marker', pageSize, data.lastDoc);
        if (result) {
            setData((prevData: MarkerData) => ({
                ...prevData,
                data: [...prevData.data, ...result.data],
                lastDoc: result.lastVisible,
                hasMore: result.data.length === pageSize
            }));
        } else if (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFirstPage();
    }, []);

    return (
        <>
            <div className={type === 'map' ? Styles.container + ' ' + Styles.map : Styles.container}>
                <div className="typeSelector">
                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => setType('list')}>리스트</button>
                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => setType('map')}>지도</button>
                    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={() => setType('card')}>카드</button>
                </div>
                <Listing />
                <div className={Styles.buttonArea}>
                    {(data as MarkerData).hasMore && (
                        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={fetchNextPage}>Load More</button>
                    )}
                    <Link href="./write" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">글쓰기</Link>
                </div>
            </div >
        </>
    );
}

export default List;
