import { FaHistory, FaMoneyBill, FaWallet } from "react-icons/fa";
import { FiAtSign, FiLogIn } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";

const Profile = ({ onClose }: { onClose: () => void }) => {
  const navigator = useNavigate();

  const navigationItems = [
    {
      label: "Subscription",
      to: "/subscription-plan",
      icon: (
        <BsCardChecklist className="text-2xl text-white hover:text-primary-200 transition-colors duration-300" />
      ),
    },
    {
      label: "Payment history",
      to: "/my/payment-history",
      icon: (
        <FaWallet className="text-2xl text-white hover:text-primary-200 transition-colors duration-300" />
      ),
    },
    {
      label: "My List",
      to: "/my/stories",
      icon: (
        <RiBookShelfLine className="text-2xl text-white hover:text-primary-200 transition-colors duration-300" />
      ),
    },
    {
      label: "History reading",
      to: "/my/history",
      icon: (
        <FaHistory className="text-2xl text-white hover:text-primary-200 transition-colors duration-300" />
      ),
    },
  ];

  return (
    <div className="fixed top-3 max-md:top-0 max-md:right-0 w-screen h-screen bg-gray-900 text-white z-50 md:w-[350px] md:h-auto md:rounded-lg md:mt-16 md:-ml-80 md:border border-stone-600 p-4 overflow-y-auto scrollbar-hide transition-transform duration-300 transform md:translate-x-0">
      {/* Nút đóng */}
      <div className="w-full flex justify-end">
        <button
          onClick={onClose}
          className="text-white mb-4 hover:text-red-400 transition"
        >
          ✖ Close
        </button>
      </div>

      {/* Số dư và nút nạp tiền */}
      <div className="bg-gray-800 p-3 mt-1 rounded-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <p className="flex items-center gap-2">
            <FaMoneyBill className="text-green-400" /> 0
          </p>
        </div>
        <div title="Nạp tiền">
          <IoIosAddCircle className="text-xl text-purple-400 cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      <ThemeSwitcher />

      {/* Navigation Items */}
      {navigationItems.map((item, index) => (
        <Link to={item.to} key={index} onClick={onClose}>
          <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-primary-700 transition-all duration-300 mt-2">
            <p className="text-sm font-medium">{item.label}</p>
            {item.icon}
          </div>
        </Link>
      ))}

      {/* Nút Sign in / Sign up */}
      <div className="flex gap-2 w-full">
        <button
          className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500 transition"
          onClick={() => {
            onClose();
            navigator("/auth/login");
          }}
        >
          <FiLogIn className="mr-2" /> Sign in
        </button>
        <button
          className="w-full mt-4 bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500 transition"
          onClick={() => {
            onClose();
            navigator("/auth/register");
          }}
        >
          <FiAtSign className="mr-2" /> Sign up
        </button>
      </div>
    </div>
  );
};

export default Profile;
