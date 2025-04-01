import React, { useState } from "react";
import { IChapter } from "../../type/comic";

// Định nghĩa interface cho props
interface Payload {
  chap: IChapter;
}

const Purchase: React.FC<Payload> = ({ chap }) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    "subscription" | "gems" | null
  >(null);

  // Hàm xử lý việc mua chapter
  const handlePurchase = (option: "subscription" | "gems") => {
    setIsLoading(true);
    setSelectedOption(option);

    // Giả lập API call để mua chapter
    setTimeout(() => {
      setIsPurchased(true);
      setIsLoading(false);
      alert(
        `Bạn đã mở khóa thành công Chapter ${chap.title} bằng ${
          option === "subscription" ? "Subscription" : "Gems"
        }!`
      );
    }, 2000); // Giả lập độ trễ 2 giây
  };

  return (
    <div className="p-5 w-full h-full mx-auto  text-white rounded-lg font-sans flex flex-col gap-4 justify-between ">
      {isPurchased ? (
        <div className="text-center">
          <p className="text-green-500 text-base">Đã mở khóa thành công!</p>
          <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Đọc ngay
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          {/* Tùy chọn Subscription */}
          <div>
            <div
              className={`flex justify-between p-4 bg-gray-800 rounded-lg mb-3 cursor-pointer border border-stone-600 ${
                selectedOption === "subscription"
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedOption("subscription")}
            >
              <div className="w-full ">
                <h4 className="text-base font-medium">Subscription</h4>
                <p className="text-green-400 text-sm mt-1">$4.99/month</p>
                <p className="text-gray-400 text-xs mt-1">
                  Binge the entire series and more
                </p>
              </div>
            </div>

            {/* Tùy chọn Unlock with Gems */}
            <div
              className={`flex justify-between p-4 bg-gray-800 rounded-lg mb-3 cursor-pointer  border border-stone-600  ${
                selectedOption === "gems" ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedOption("gems")}
            >
              <div>
                <h4 className="text-base font-medium">Unlock with coin</h4>
                <p className="text-green-400 text-sm mt-1">
                  {chap.price} Coin/Chapter
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  This chapter {chap.title} is yours to enjoy
                </p>
              </div>
            </div>
          </div>

          {/* Nút Continue to unlock */}
          <button
            onClick={() => {
              if (selectedOption) {
                handlePurchase(selectedOption);
              } else {
                alert("Vui lòng chọn một tùy chọn để tiếp tục!");
              }
            }}
            disabled={isLoading || !selectedOption}
            className={`w-full py-2 rounded-md text-white ${
              isLoading || !selectedOption
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Đang xử lý..." : "Continue to unlock"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Purchase;
