import { useAtomValue, atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { markerDataType } from '../types';
// auth
export const authModalAtom = atomWithReset<'login' | 'signup' | undefined>(undefined);
export const showPasswordAtom = atom(true);

// map 
export const initialZoomAtom = atom<number>(10);
export const initialCenterAtom = atom<number[]>([37.3595704, 127.105399]);
export const markerDataMapAtom = atom<string[]>([]);
export const detailToggleAtom = atom<boolean>(false);
export const detailMapAtom = atom<any>({});
// list
export const markerDataAtom = atom<markerDataType | null>(null);
export const urlAtom = atom<string[]>([]);

// write
export const markerWriteDataAtom = atom<any>({});

// view
export const markerIdAtom = atom<any>('');
export const markerViewDataAtom = atom<any>({});