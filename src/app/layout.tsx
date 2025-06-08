// This is a SERVER COMPONENT (no 'use client')

import './(site)/globals.css';
import { ReduxProvider } from './ReduxProvider';
import AppWrapper from './AppWrapper'; // includes auth logic
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: 'KARTRA',
  description: 'Your Shopping Destination',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</Head>
      <body>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  );
}
