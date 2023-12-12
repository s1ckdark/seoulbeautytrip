'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.scss';

interface Props {
    inComponent?: boolean;
    test?: boolean;
}

const Loading = ({ inComponent, test }: Props) => {
    const hourGlassCursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent): void => {
            const cursor = hourGlassCursorRef.current;
            if (!cursor || !e.target) return;

            if (e.target instanceof Element) {
                const { localName } = e.target;
                if (!localName) return;

                if (['a', 'button'].includes(localName)) {
                    cursor.style.display = 'none';
                } else {
                    cursor.style.display = 'block';
                    cursor.style.left = `${e.pageX - 25 / 2}px`;
                    cursor.style.top = `${e.pageY - 25 / 2}px`;
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className={styles.loadingPage}>
            <div>Loading...</div>
            {/* <div ref={hourGlassCursorRef} className={styles.hourGlassCursor} /> */}
        </div>
    );
};

export default Loading;