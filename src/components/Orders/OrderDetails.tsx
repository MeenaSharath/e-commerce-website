import React from "react";

const OrderDetails = ({ orderItem }: any) => {
  return (
    <>
      <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
        <div className="min-w-[213px]">
          <p className="text-custom-sm text-dark">Products</p>
        </div>
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Sub Total</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Shipping Fee</p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">Total</p>
        </div>
      </div>

      <div className="items-center justify-between border-t border-gray-3 py-5 px-6 hidden md:flex">
        <div className="min-w-[213px]">
          <p className="text-custom-sm text-red">
            {orderItem.cartItems}
          </p>
        </div>
        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">
            {orderItem.subtotal}
          </p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">
            {orderItem.shippingfee}
          </p>
        </div>

        <div className="min-w-[113px]">
          <p className="text-custom-sm text-dark">
            {orderItem.total}
          </p>
        </div>
      </div>
      <div className="px-7.5 w-full">
        <p className="font-bold">Shipping Address:</p>{" "}
        <p>{orderItem.shipping}</p>
      </div>
    </>
  );
};

export default OrderDetails;
