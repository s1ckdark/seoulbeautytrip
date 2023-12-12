import { Timestamp } from 'firebase/firestore';

/** 숫자를 입력받아 갯수만큼 아이템을 가진 어레이 리턴 */
export const getNumberArr = (length: number): number[] => {
    return [...Array(parseInt(String(length), 10)).keys()];
};

/** 숫자를 M, K 등으로 단위 묶음 리턴 */
export const shrinkNumber = (value: number | string) => {
    if (typeof value === 'string') return value;
    if (value >= 1_000_000) {
        return `${parseInt(String(value / 1_000_000), 10).toString()}M`;
    }
    if (value >= 1_000) {
        return `${parseInt(String(value / 1000), 10).toString()}K`;
    }
    return value;
};

export const getUserName = (user: any) => {
    return user.id ? user.name : user.id.substring(0, 8);
};

// export const getAuthorData = (user: User) => {
//     return {
//         authorId: user.uid,
//         author: {
//             nickname: getUserName(user),
//             nicknameIsFake: !user.displayName, // displayName이 없을 경우
//             profileUrl: user.photoURL ?? '',
//         },
//     };
// };

export const valueOr = (value: string | boolean | undefined, _placeholder?: string, ifTrue?: string) => {
    const placeholder = _placeholder ?? '-';
    if (typeof value === 'undefined') return placeholder;
    if (typeof value === 'boolean') return value ? ifTrue : placeholder;
    if (value === '') return placeholder;
    return ifTrue ?? value;
};

export const getDateKST = (unixTimestamp: any) => {
    // Create a new Date object using the provided Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp);

    // Format the date and time in KST
    const kstOptions: object = {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return date.toLocaleString('ko-KR', kstOptions);
}