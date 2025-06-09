"use client";
import React, { useEffect, useState, useRef } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Billing from "./Billing";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import { useAppSelector } from "@/redux/store";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import axios from "axios";

type UserType = {
  name: string;
  email: string;
  _id?: string;
};

const Checkout = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [shippingData, setShippingData] = useState({
    name: "",
    address: "",
    town: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [showShipping, setShowShipping] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  const shippingFee = 15;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;
  const totalInPaise = total * 100;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-project-dashboard.onrender.com";

  useEffect(() => {
    axios
      .get<{ user: UserType }>(`${API_BASE}/getCurrentUser`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) =>
        console.error("User fetch error:", axios.isAxiosError(err) ? err.message : err)
      );
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showShipping) setShowShipping(true);
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;
    return name && email && phone && address;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!validateForm()) {
      alert("Please fill in all required billing fields.");
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      userId: user._id,
      cartItems,
      subtotal,
      total,
      billing: formData,
      shipping: showShipping ? shippingData : { ...formData },
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      console.log("Order success:", data);
      setSuccessMessage("Order placed successfully!");

      // Record in salepage
      const saleRes = await fetch(`${API_BASE}/salepage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          orderid: user._id,
          name: formData.name,
          products: cartItems.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            amount: item.price,
            paystatus: "Pending",
          })),
        }),
      });

      const saleResponse = await saleRes.json();

if (!saleRes.ok) {
  console.error("Sale page save failed:", saleResponse);
} else {
  console.log("Sale saved:", saleResponse);
}

      // Reset form and cart
      formRef.current?.reset();
      setFormData({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
      setShippingData({ name: "", address: "", town: "", zip: "", phone: "", email: "" });
      dispatch(removeAllItemsFromCart());
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong while submitting your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Checkout" pages={["checkout"]} />
      <section className="overflow-hidden py-6 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              <div className="lg:max-w-[670px] w-full">
                <Billing formData={formData} onChange={handleBillingChange} />
                <Shipping
                  show={showShipping}
                  shippingData={shippingData}
                  onChange={handleShippingChange}
                />
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <label htmlFor="notes" className="block mb-2.5">
                    Other Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    placeholder="Notes about your order, e.g. special delivery instructions."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                </div>
              </div>

              <div className="max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Your Order</h3>
                  </div>
                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <h4 className="font-medium text-dark">Product</h4>
                      <h4 className="font-medium text-dark text-right">Subtotal</h4>
                    </div>
                    {cartItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-5 border-b border-gray-3"
                      >
                        <p className="text-dark">
                          {item.title} x {item.quantity}
                        </p>
                        <p className="text-dark text-right">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">Shipping Fee</p>
                      <p className="text-dark text-right">${shippingFee.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="font-medium text-lg text-dark">Total</p>
                      <p className="font-medium text-lg text-dark text-right">₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Coupon />
                <ShippingMethod />
                <PaymentMethod
                  name={formData.name}
                  email={formData.email}
                  contact={formData.phone}
                  amount={totalInPaise}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  {isSubmitting ? "Processing..." : "Process to Checkout"}
                </button>

                {successMessage && (
                  <p className="text-green-600 font-medium mt-4">{successMessage}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
