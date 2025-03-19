import { FaMoneyBill } from "react-icons/fa";
import { FiAtSign, FiLogIn, FiLogOut } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";

const Profile = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="md:w-[350px] bg-gray-900 max-md:h-screen max-md:z-50 fixed  md:absolute top-0 right-0  max-md:[bottom-0,left-0] w-screen text-white md:rounded-lg p-4 overflow-y-auto shadow-lgvisible scrollbar-hide md:mt-16 md:-ml-80 md:border border-stone-600 ">
      {/* Thông tin người dùng */}
      <div className="w-full flex justify-end">
        <button onClick={onClose} className="text-white mb-4 ">
          ✖ Close
        </button>
      </div>
      <div className="flex items-center space-x-3">
        {/* <div className="flex gap-2">
          <img
            src="https://www.fakepersongenerator.com/Face/female/female20171026351322357.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold">Fullname</p>
            <p className="text-sm text-gray-400">Type of account</p>
          </div>
        </div> */}
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
      {/* <button className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-red-600">
        <FiLogOut className="mr-2" /> Sign out
      </button> */}
      <div className="flex gap-2 w-full">
        <div className="flex gap-2 w-full">
          <button className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500">
            <FiLogIn className="mr-2" /> Sign in
          </button>
          <button className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500">
            <FiAtSign className="mr-2" /> Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
