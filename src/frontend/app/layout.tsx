import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { ReactNode } from 'react'

import './globals.css'

import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HaloTalk',
  description: 'Real-Time Messaging Application',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          { children }
        </AuthContext>
      </body>
    </html>
  );
}
