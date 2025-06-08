import React, { useState } from "react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

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
  [key: string]: any;
}

interface Props {
  orderItem: OrderItemType;
  smallView: boolean;
  userId: string;
}

const SingleOrder: React.FC<Props> = ({ orderItem, smallView, userId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState("");

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
    setShowEdit(status);
  };

  const handleReturnSubmit = async (finalReason: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/return/${orderItem._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemTitle: selectedItem?.title,
          returnReason: finalReason,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit return reason");

      const data = await res.json();
      console.log("Return saved:", data);
      toast.success(`Returned ${selectedItem?.title} Successfully`);
      setShowReturnModal(false);
      setReason("");
      setCustomReason("");
      setError("");
    } catch (err) {
      console.error("Error submitting return reason:", err);
      alert("Failed to submit return. Please try again.");
    }
  };

  return (
    <>
      {/* Desktop View */}
      {!smallView &&
        orderItem.cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-t border-gray-300 py-4 px-6 hidden md:flex"
          >
            <div className="min-w-[387px]">
              <p className="text-custom-sm text-dark">
                {item.title} (x{item.quantity})
              </p>
            </div>
            <div className="min-w-[213px]">
              <p className="text-custom-sm text-dark">₹{item.price * item.quantity}</p>
            </div>
            <div className="min-w-[213px]">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowDetails(true);
                }}
                className="flex items-center gap-1 text-sm py-1 rounded bg-gray"
              >
                <Eye size={16} />
                View Item
              </button>
            </div>
</div>
            
        ))}

      {/* Mobile View */}
      {smallView && (
        <div className="block md:hidden border-t border-gray-3 py-4.5 px-6">
          {orderItem.cartItems.map((item, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-custom-sm text-dark font-bold">{item.title}</p>
              <p className="text-custom-sm text-dark">
                Qty: {item.quantity} | Price: ₹{item.price}
              </p>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowDetails(true);
                }}
                className="flex items-center gap-1 mt-2 text-sm py-1 rounded bg-gray"
              >
                <Eye size={16} />
                View Item
              </button>
            </div>
          ))}
        </div>
      )}

      {/* View Item Modal */}
      {showDetails && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Item Details</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">Item Name</label>
              <input
                type="text"
                value={selectedItem.title}
                readOnly
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={selectedItem.quantity}
                readOnly
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="text"
                value={`₹${selectedItem.price}`}
                readOnly
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDetails(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 bg-gray rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setShowReturnModal(true);
                }}
                className="px-4 py-2 bg-red text-white rounded"
              >
                Return Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal Inline */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowReturnModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Return Item</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!reason) {
                  setError("Please select a reason.");
                  return;
                }

                if (reason === "Other" && !customReason.trim()) {
                  setError("Please specify your reason.");
                  return;
                }

                setError("");
                const finalReason = reason === "Other" ? customReason : reason;
                handleReturnSubmit(finalReason);
              }}
              className="space-y-4"
            >
              <div>
                <p className="font-medium mb-2">
                  Select a return reason<span className="text-red-500">*</span>:
                </p>
                <div className="space-y-2">
                  {["Damaged", "Incorrect item", "No longer needed", "Other"].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name="reason"
                        value={option}
                        checked={reason === option}
                        onChange={(e) => setReason(e.target.value)}
                        className="accent-blue-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {reason === "Other" && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Please specify your reason<span className="text-red-500">*</span>:
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Type your reason..."
                  />
                </div>
              )}

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="bg-dark text-white px-5 py-2 rounded-md hover:bg-dark transition"
                >
                  Submit Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrder;
