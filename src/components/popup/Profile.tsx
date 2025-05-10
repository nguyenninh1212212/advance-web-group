import { FaHistory, FaMoneyBill, FaSignOutAlt, FaWallet } from "react-icons/fa";
import { FiAtSign, FiLogIn } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { RiBookShelfLine, RiProfileFill } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { useTheme } from "../../util/theme/theme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/login";
import { getProfile } from "../../api/my";

const Profile = ({ onClose }: { onClose: () => void }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popUpProfile"],
    queryFn: getProfile,
  });
  console.log("🚀 ~ data:", data?.result);
  console.log("🚀 ~ isLoading:", isLoading);
  console.log("🚀 ~ error:", error);

  const pr = data?.result;
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await logout(); // Gọi hàm logout bất đồng bộ nếu có
      localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
      localStorage.clear(); // Xóa toàn bộ localStorage nếu cần
      queryClient.clear(); // Xóa tất cả dữ liệu cache của React Query
      onClose(); // Đóng giao diện (nếu cần)
      navigator("/auth/login"); // Chuyển hướng tới trang login
    } catch (error) {
      console.error("Error during logout:", error); // Log lỗi nếu có sự cố trong quá trình logout
    }
  };

  const theme = useTheme();
  const iconst = {
    st: `text-2xl  hover:${theme.hover} transition-colors duration-300 ${theme.text}`,
  };
  const token = localStorage.getItem("accessToken");
  const navigationItems = [
    {
      label: "Profile",
      to: "/my/profile",
      icon: <RiProfileFill className={iconst.st} />,
    },
    {
      label: "Subscription",
      to: "/subscription-plan",
      icon: <BsCardChecklist className={iconst.st} />,
    },
    {
      label: "Payment history",
      to: "/my/payment-history",
      icon: <FaWallet className={iconst.st} />,
    },
    {
      label: "My List",
      to: "/my/list",
      icon: <RiBookShelfLine className={iconst.st} />,
    },
    {
      label: "History reading",
      to: "/my/history",
      icon: <FaHistory className={iconst.st} />,
    },
  ];

  const handleTopUpClick = () => {
    navigator("/payment/to-up");
  };

  return (
    <div
      className={`fixed top-3 max-md:top-0 max-md:right-0 w-screen h-screen ${theme.header} text-white z-50 md:w-[350px] md:h-auto md:rounded-lg md:mt-16 md:-ml-80 md:border border-stone-600 p-4 overflow-y-auto scrollbar-hide transition-transform duration-300 transform md:translate-x-0`}
    >
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

      <div
        className={` p-3 mt-1 rounded-lg flex justify-between items-center ${theme.card} ${theme.text}`}
      >
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 flex-col">
            <img src={`${pr.imageUrl}`} alt="" className="rounded-full" />
            <div>{pr.fullName}</div>
          </div>
          <p className="flex items-center gap-2">
            <FaMoneyBill className="text-green-400" /> {pr.balance}
          </p>
        </div>
        <div title="Nạp tiền">
          <IoIosAddCircle
            onClick={handleTopUpClick}
            className="text-xl text-purple-400 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>

      <ThemeSwitcher />

      {/* Navigation Items */}
      {navigationItems.map((item, index) => (
        <Link to={item.to} key={index} onClick={onClose}>
          <div
            className={`flex justify-between items-center ${theme.card} p-3 rounded-lg cursor-pointer hover:bg-primary-700 transition-all duration-300 mt-2 ${theme.text} `}
          >
            <p className="text-sm font-medium ">{item.label}</p>
            <p className={`${theme.text}`}> {item.icon}</p>
          </div>
        </Link>
      ))}

      {/* Nút Sign in / Sign up */}
      {token == null ? (
        <div className="flex gap-2 w-full">
          <button
            className={`w-full mt-4 ${theme.background_card} ${theme.text} p-3 rounded-lg flex items-center justify-center  transition`}
            onClick={() => {
              onClose();
              navigator("/auth/login");
            }}
          >
            <FiLogIn className="mr-2" /> Sign in
          </button>
          <button
            className={`w-full mt-4 ${theme.background_card} ${theme.text} p-3 rounded-lg flex items-center justify-center  transition`}
            onClick={() => {
              onClose();
              navigator("/auth/register");
            }}
          >
            <FiAtSign className="mr-2" /> Sign up
          </button>
        </div>
      ) : (
        <>
          <button
            className={`w-full mt-4 ${theme.background_card} ${theme.text} p-3 rounded-lg flex items-center justify-center  transition`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Sign out
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
