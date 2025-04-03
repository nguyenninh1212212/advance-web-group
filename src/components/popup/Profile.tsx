import { FaMoneyBill } from "react-icons/fa";
import { FiAtSign, FiLogIn } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Profile = ({ onClose }: { onClose: () => void }) => {
  const navigator = useNavigate();
  return (
    <div className="fixed top-3 max-md:top-0 max-md:right-0 w-screen h-screen bg-gray-900 text-white z-50 md:w-[350px] md:h-auto md:rounded-lg md:mt-16 md:-ml-80 md:border border-stone-600 p-4 overflow-y-auto scrollbar-hide transition-transform duration-300 transform md:translate-x-0">
      {/* Nút đóng */}
      <div className="w-full flex justify-end">
        <button onClick={onClose} className="text-white mb-4">
          ✖ Close
        </button>
      </div>

      {/* Số dư và nút nạp tiền */}
      <div className="bg-gray-800 p-3 mt-1 rounded-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <p className="flex items-center gap-2">
            <FaMoneyBill className="text-green-400" />0
          </p>
        </div>
        <IoIosAddCircle className="text-xl text-purple-400 cursor-pointer" />
      </div>

      {/* Subscription */}
      <div className="bg-gray-800 p-3 mt-4 rounded-lg">
        <p className="font-bold">Regular account</p>
        <p className="text-gray-400 text-sm">
          Upgrade your account to enjoy unlimited reading stories
        </p>
      </div>

      {/* Các mục khác */}
      <div className="mt-4 space-y-3">
        {[{ label: "Wallet" }, { label: "Payment history" }].map(
          (item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              <p>{item.label}</p>
            </div>
          )
        )}
      </div>

      {/* Nút Sign out */}
      <div className="flex gap-2 w-full">
        <button
          className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500"
          onClick={() => navigator("/auth/login")}
        >
          <FiLogIn className="mr-2" /> Sign in
        </button>
        <button
          className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500"
          onClick={() => navigator("/auth/register")}
        >
          <FiAtSign className="mr-2" /> Sign up
        </button>
      </div>
    </div>
  );
};

export default Profile;
