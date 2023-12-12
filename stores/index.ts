import { useAtomValue, atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

// auth
export const authModalAtom = atomWithReset<'login' | 'signup' | undefined>(undefined);
export const showPasswordAtom = atom(true);

// map 
export const initialZoomAtom = atom<number>(10);
export const initialCenterAtom = atom<number[]>([37.3595704, 127.105399]);
export const markerDataMapAtom = atom<string[]>([]);
// list
export const listTypeAtom = atom<"list" | "map" | "card">("list");
export const markerDataAtom = atom<string[]>([]);
export const urlAtom = atom<string[]>([]);

// write
export const markerWriteDataAtom = atom<any>({});

// view
export const markerIdAtom = atom<any>('');
export const markerViewDataAtom = atom<any>({});