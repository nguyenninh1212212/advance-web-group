import React, { useState } from "react";
import { IChapter } from "../../type/comic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyChapter } from "../../api/chapter";
import { useToast } from "../../util/ToastContext";
import AreYouSure from "./AreYouSure";
import { BiMoney } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// Định nghĩa interface cho props
interface Payload {
  chap: IChapter;
  id: string;
}

const Purchase: React.FC<Payload> = ({ chap, id }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    "subscription" | "gems" | null
  >(null);
  const queryclient = useQueryClient();

  const { showToast } = useToast();
  const navigate = useNavigate();
  const mutationBuyChapter = useMutation({
    mutationKey: ["buy chapter"],
    mutationFn: () => buyChapter(chap.id),
    onSuccess: () => {
      showToast("Mua thanh cong", "success");
      queryclient.invalidateQueries({ queryKey: ["comicDetail", id] });
    },
    onError: () => {
      showToast("Mua that bai", "error");
    },
  });

  const handleBuy = () => {
    setOpen(!open);
    mutationBuyChapter.mutate();
  };

  const handleConfirm = () => {
    setOpen(!open);
  };

  return (
    <div className="p-5 w-full h-full mx-auto  text-white rounded-lg font-sans flex flex-col gap-4 justify-between ">
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
            <div
              className="w-full "
              onClick={() => navigate("/subscription-plan")}
            >
              <h4 className="text-base font-medium">Subscription</h4>

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
            <div onClick={handleConfirm}>
              <h4 className="text-base font-medium">Unlock with money</h4>
              <p className="text-green-400 text-sm mt-1 flex gap-1 items-center">
                {chap.price} <BiMoney />
              </p>
              <p className="text-gray-400 text-xs mt-1">
                This chapter {chap.title} is yours to enjoy
              </p>
            </div>
          </div>
        </div>

        {/* Nút Continue to unlock */}
      </div>
      <AreYouSure
        visible={open}
        onCancel={() => setOpen(!open)}
        onConfirm={handleBuy}
        message="Bạn có chắc muốn mua chương này?"
      />
    </div>
  );
};

export default Purchase;
