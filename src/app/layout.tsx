import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider, UserButton } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="bg-blue-600 bg-opacity-70 text-white p-4 shadow-md flex items-center justify-between">
            <div className="flex justify-center w-full">
              <a href="/" className="text-lg font-bold">
                easy-opus
              </a>
            </div>
            <div className="absolute right-4">
              <UserButton />
            </div>
          </nav>
          <>{children}</>
        </body>
      </html>
    </ClerkProvider>
  )
}