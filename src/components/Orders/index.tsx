import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

interface OrdersListProps {
  user: {
    email?: string;
    _id?: string; // assuming _id is the userId
  } | null;
}

interface CartItem {
  title: string;
  quantity: number;
  price: number;
  returnReason: string;
}

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderItemType {
  _id: string;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: string;
}

const Orders: React.FC<OrdersListProps> = ({ user }) => {
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getOrderDetails/${user.email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[770px]">
        {/* Desktop Header */}
        <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex">
          <div className="min-w-[387px]">
            <p className="text-custom-sm text-dark">Product</p>
          </div>
          <div className="min-w-[213px]">
            <p className="text-custom-sm text-dark">Sub Total</p>
          </div>
          <div className="min-w-[213px]">
            <p className="text-custom-sm text-dark">Action</p>
          </div>
        </div>

        {/* Desktop Orders */}
        {orders.map((order) => (
          <SingleOrder key={order._id} orderItem={order} smallView={false} userId={user?._id || ""} />
        ))}
      </div>

      {/* Mobile Orders */}
      {orders.map((order) => (
        <SingleOrder key={`${order._id}-mobile`} orderItem={order} smallView={true} userId={user?._id || ""}/>
      ))}
    </div>
  );
};

export default Orders;
