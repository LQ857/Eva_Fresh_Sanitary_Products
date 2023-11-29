import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "EvaFresh",
  description: "A website for selling sanitary products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <AuthProvider>{children}</AuthProvider>
    </html>
  )
}