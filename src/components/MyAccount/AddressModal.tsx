import React, { useEffect } from "react";

type AddressFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type AddressModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  addressFormData: AddressFormData;
  setAddressFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
};

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  closeModal,
  addressFormData,
  setAddressFormData,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
        isOpen ? "block z-99999" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 sm:top-3 sm:right-3 w-10 h-10 rounded-full bg-meta text-body hover:text-dark"
          >
            {/* Close icon */}
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083..."
                fill=""
              />
            </svg>
          </button>

          <form>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
              <div className="w-full">
                <label htmlFor="name" className="block mb-2.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={addressFormData.name}
                  onChange={handleChange}
                  className="rounded-md border w-full py-2.5 px-5"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block mb-2.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={addressFormData.email}
                  onChange={handleChange}
                  className="rounded-md border w-full py-2.5 px-5"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
              <div className="w-full">
                <label htmlFor="phone" className="block mb-2.5">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={addressFormData.phone}
                  onChange={handleChange}
                  className="rounded-md border w-full py-2.5 px-5"
                />
              </div>
              <div className="w-full">
                <label htmlFor="address" className="block mb-2.5">Address</label>
                <input
                  type="text"
                  name="address"
                  value={addressFormData.address}
                  onChange={handleChange}
                  className="rounded-md border w-full py-2.5 px-5"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
