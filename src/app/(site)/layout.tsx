'use client';

import { useState, useEffect } from 'react';
import "../css/euclid-circular-a-font.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <CartModalProvider>
      <ModalProvider>
        <PreviewSliderProvider>
          <Header />
          {children}
          <QuickViewModal />
          <CartSidebarModal />
          <PreviewSliderModal />
          <ScrollToTop />
          <Footer />
        </PreviewSliderProvider>
      </ModalProvider>
    </CartModalProvider>
   
  );
}
