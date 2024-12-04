import type { Metadata } from "next";
import localFont from "next/font/local"; // If you're not using it, you can remove this line
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";
import  {DashboardProvider}  from '@/helpers/dashboardContext';
import { ApiProvider } from '@/helpers/apiContext'; // Adjust the import path as necessary

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(
  {
  children,
}: {
  children: React.ReactNode;
}
) {
  return (
    <html lang="en">
      <head>
        <title>Your Title</title>
      </head>
      <body suppressHydrationWarning={true} className="antialiased">
        <Toaster />
        <DashboardProvider> 
        <ApiProvider>       
            {children}
        </ApiProvider>
          </DashboardProvider>

      </body>
    </html>
  );
}
