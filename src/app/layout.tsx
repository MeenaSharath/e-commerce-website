// This is a SERVER COMPONENT (no 'use client')

import './(site)/globals.css';
import { ReduxProvider } from './ReduxProvider';
import AppWrapper from './AppWrapper'; // includes auth logic
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from 'next/script';

export const metadata = {
  title: 'KARTRA',
  description: 'Your Shopping Destination',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Note: <Script> must NOT be inside here */}
      </head>
      <body>
        {/* ✅ Razorpay script loaded correctly */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  );
}
