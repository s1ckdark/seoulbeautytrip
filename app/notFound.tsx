import Image from 'next/image';

import styles from './notFound.module.scss';

const NotFound = () => {
    return (
        <main className={styles.notFound}>
            <h1>Hello 404</h1>
        </main>
    );
};

export default NotFound;