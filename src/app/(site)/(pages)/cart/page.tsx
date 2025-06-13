"use client";

import React from "react";
import Cart from "@/components/Cart";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
