'use client';
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import axios from "axios";
type UserType = {
  name: string;
  email: string;
  _id?: string;
};

const OrderSummary = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios
      .get<{ user: UserType }>(`${API_BASE}/getCurrentUser`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) =>
        console.error("User fetch error:", axios.isAxiosError(err) ? err.message : err)
      );
  }, [API_BASE]);


  const handleCheckout = () => {
    if (!user || !user._id) {
      alert("You must be logged in to place an order.");
      return;
    }
    else{
    router.push('/checkout');
    }
  };

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-dark">{item.title}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  ₹{item.discountedPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            onClick={handleCheckout}
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
