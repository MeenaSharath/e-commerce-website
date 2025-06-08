import React, { useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any;
  }
}
type Props = {
  name: string;
  email: string;
  contact: string;
  amount: number;
};

const PaymentMethod: React.FC<Props> = ({ name, email, contact, amount }) => {
  const [payment, setPayment] = useState<string>("");
  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']");
    if (existingScript) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleRazorpay = async () => {
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_LTBLjiy2iW5YqZ", 
    amount: amount, // amount in paise = ₹500
    currency: "INR",
    name: "KARTRA",
    description: "Transaction Details",
    handler: function (response: any) {
      alert(`Payment successful. Razorpay Payment ID: ${response.razorpay_payment_id}`);
    },
    prefill: {
      Name: name,
      Email: email,
      Contact: contact,
      },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Payment Method</h3>
      </div>

      <div className="p-1 sm:p-8.5">
        <div className="flex flex-col gap-3">
          {/* Razorpay option (GPay/UPI wrapper) */}
          <label htmlFor="gpay" className="flex cursor-pointer items-center gap-4">
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="gpay"
                className="sr-only"
                checked={payment === "gpay"}
                onChange={() => {
                  setPayment("gpay");
                  handleRazorpay();
                }}
              />
              <div className={`flex h-4 w-4 items-center justify-center rounded-full ${payment === "gpay" ? "border-4 border-blue" : "border border-gray-4"}`}></div>
            </div>
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${payment === "gpay" ? "border-transparent bg-gray-2" : " border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/bank4.jpg" alt="Google Pay" width={30} height={30} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Google Pay (via Razorpay)</p>
                </div>
              </div>
            </div>
          </label>

          {/* Cash on Delivery */}
          <label htmlFor="cash" className="flex cursor-pointer items-center gap-4">
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="cash"
                className="sr-only"
                checked={payment === "cash"}
                onChange={() => {
                  setPayment("cash");
                }}
              />
              <div className={`flex h-4 w-4 items-center justify-center rounded-full ${payment === "cash" ? "border-4 border-blue" : "border border-gray-4"}`}></div>
            </div>
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${payment === "cash" ? "border-transparent bg-gray-2" : " border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/cash.svg" alt="Cash" width={21} height={21} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Cash on Delivery</p>
                </div>
              </div>
            </div>
          </label>

          {/* PhonePe or Razorpay UPI */}
          <label htmlFor="phonepe" className="flex cursor-pointer items-center gap-4">
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="phonepe"
                className="sr-only"
                checked={payment === "phonepe"}
                onChange={() => {
                  setPayment("phonepe");
                  handleRazorpay();
                }}
              />
              <div className={`flex h-4 w-4 items-center justify-center rounded-full ${payment === "phonepe" ? "border-4 border-blue" : "border border-gray-4"}`}></div>
            </div>
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${payment === "phonepe" ? "border-transparent bg-gray-2" : " border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/bank3.jpg" alt="PhonePe" width={21} height={21} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>PhonePe (via Razorpay UPI)</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
