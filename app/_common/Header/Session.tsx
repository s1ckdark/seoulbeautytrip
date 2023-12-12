'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { signIn, signOut, useSession } from "next-auth/react";
import { getUserName } from '@/utils';
import Loading from '@/components/Loading';
import styles from './Session.module.scss';

const Session = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { user } = session || {};
    if (status === 'loading') return <div className={styles.session} />;

    const clickSingout = () => {
        const onLogOutClick = () => {
            signOut()
            router.push('/');
        };
    }
    return user?.name ? (
        <div className={styles.session}>
            <div className="username m-5">
                <p className={styles.userName}><span><img src={user?.image || undefined} title="profile" /></span>{getUserName(user)}</p>
            </div>
            <div className="btnArea m-5">
                <button type='button' onClick={() => signOut()}>
                    <span>LOGOUT</span>
                </button>
            </div>
        </div>
    ) : (
        <div className={styles.session}>
            <div className="btnArea m-5">
                <button type='button' onClick={() => router.push('/signin')}>
                    SIGNIN
                </button>
                {/* <button type='button' onClick={()=>signUp()}>
                    회원가입
                </button> */}
            </div>
        </div>
    );
};

export default Session;