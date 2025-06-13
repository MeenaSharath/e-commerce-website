import React from "react";
import Cart from "@/components/Cart";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart Page | NextCommerce Nextjs E-commerce template",
  description: "This is Cart Page for NextCommerce Template",
  // other metadata
};

const CartPage = () => {
  return (
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Cart />
      </PersistGate>
    </Provider>
    
  );
};

export default CartPage;
