'use client';
import View from '@/containers/marker/View';
import { useAtom } from 'jotai';
import { markerIdAtom } from '@/stores';

const ViewPage = ({ id }: { id: string }) => {
    const [viewId, setViewId] = useAtom(markerIdAtom);
    setViewId(id);
    return (
        <>
            <View />
        </>
    )
}
export default ViewPage;