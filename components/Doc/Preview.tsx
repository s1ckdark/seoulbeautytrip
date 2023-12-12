import { useAtom } from 'jotai';
import { markerWriteDataAtom } from '@/stores';
import Styles from './Preview.module.scss';
import { getStorage, ref, deleteObject } from 'firebase/storage';
interface markerWriteData {
    title: string;
    address: string;
    url: string[];
    lat: number;
    lng: number;
    category: string;
    description: string;
}
const Preview = () => {
    const [data, setData] = useAtom(markerWriteDataAtom);
    const urls = data['url'];
    console.log(data);

    const delImg = (index: number) => {
        // Ensuring data.url is an array and contains the item at the provided index
        if (Array.isArray(data.url) && index >= 0 && index < data.url.length) {
            const delUrl = data.url[index];
            const tmp = delUrl.split('?')[0];
            const storage = getStorage();
            const storageRef = ref(storage, tmp);
            const newUrl = data.url.filter((item: string) => item !== delUrl);

            deleteObject(storageRef)
                .then(() => {
                    setData((prevData: any) => ({
                        ...prevData,
                        url: newUrl
                    }));
                })
                .catch((error: any) => {
                    console.error('Error deleting object:', error);
                });
        } else {
            console.error('Invalid index or data.url is not an array');
        }
    };

    return (
        <div className={Styles.uploadedImg}>
            {urls && urls.length > 0 && (
                <ul>
                    {urls.map((url: string) => (
                        <li key={url} className="relative"> {/* Use URL as key */}
                            <img src={url} alt="사용자 첨부 이미지" />
                            <span className={Styles.delBtn} onClick={() => delImg(urls.indexOf(url))}>X</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Preview;
