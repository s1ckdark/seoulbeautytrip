import React, { Suspense } from 'react';
import Providers from './Providers';
import Header from './_common/Header/Header';
import { ToastContainer, toast } from "react-toastify";
import { Nanum_Gothic } from "next/font/google";
import '@/styles/globals.scss';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const nanum_gothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata = {
  metadataBase: new URL('https://seoulbeautytrip.com'),
  title: {
    absolute: 'prototype',
    template: '%s | prototype',
  },
};


interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={nanum_gothic.className}>
        <Suspense fallback={null}>
          <Providers session={session}>
            <Header />
            {children}
            <ToastContainer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;