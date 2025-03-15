import { FaMoneyBill } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";

const Profile = () => {
  return (
    <div className="w-[350px] bg-gray-900 text-white rounded-lg p-4 overflow-y-auto shadow-lg md:absolute visible scrollbar-hide mt-10 -ml-80 border border-stone-600 ">
      {/* Thông tin người dùng */}
      <div className="flex items-center space-x-3">
        <img
          src="https://www.fakepersongenerator.com/Face/female/female20171026351322357.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-bold">Fullname</p>
          <p className="text-sm text-gray-400">Type of account</p>
        </div>
      </div>

      {/* Số dư và nút nạp tiền */}
      <div className="bg-gray-800 p-3 mt-4 rounded-lg flex justify-between items-center">
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
      <button className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-red-600">
        <FiLogOut className="mr-2" /> Sign out
      </button>
    </div>
  );
};

export default Profile;
