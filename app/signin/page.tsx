"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
export default function Signin() {
    const { data: session, status } = useSession();
    const { user } = session || {};
    if (session?.user?.name) redirect("/");

    const signInWith = async (provider: string) => {
        await signIn(provider, { redirect: true, callbackUrl: "/" });
    }

    return (
        <>
            <div className="w-1/5 mx-auto">
                <button className="me-2 h-22 transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none" onClick={() => signInWith("naver")}>Naver Sign In</button>
                <button className="h-22 transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none" onClick={() => signInWith("google")}>Google Sign In</button>
            </div >
        </>
    );
}
