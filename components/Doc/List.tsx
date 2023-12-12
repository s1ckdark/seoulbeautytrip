import Styles from "./List.module.scss";
import { getDateKST as getDate } from "@/utils";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useAtomValue } from "jotai";
import { markerDataAtom } from "@/stores";

const List = () => {
    const data = useAtomValue(markerDataAtom);
    if (!data || data.length === 0) return <Loading />;
    const router = useRouter();
    const detailView = (idx: number) => {
        router.push(`/marker/view/${idx}`);
    }

    return (
        <div className={Styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th> 작성일 </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any, idx: number) => (
                            <tr key={item.id} onClick={() => detailView(item.id)}>
                                <td>{item.title} </td>
                                <td> {item.name} </td>
                                <td> {getDate(item.lastModAt)} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default List;