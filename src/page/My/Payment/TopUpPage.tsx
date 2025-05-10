import React, { useState } from "react";
import { paymentApi } from "../../../api/payment";
import { useTheme } from "../../../util/theme/theme";

const denominations = [10000, 20000, 50000, 100000, 500000];

const formatCurrency = (amount: number): string =>
  amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const TopUpPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme(); // Lấy theme hiện tại

  const handleSelectAmount = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      setError("Vui lòng chọn số tiền hợp lệ.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await paymentApi({ amount });

      console.log("Payment response:", response);

      if (response.result?.paymentUrl) {
        // Chuyển hướng người dùng đến URL thanh toán
        window.open(response.result.paymentUrl, "_self");
      } else {
        setError("Không nhận được liên kết thanh toán.");
      }
    } catch {
      window.location.href = "/auth/login"; // Redirect nếu bị 401
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center px-4 py-8`}
    >
      <div
        className={`${theme.card} ${theme.shadow} ${theme.rounded} p-6 w-full max-w-md`}
      >
        <h1 className={`text-2xl font-bold text-center mb-6 ${theme.text}`}>
          Nạp tiền vào ví
        </h1>

        <label className={`block text-sm font-medium mb-1 ${theme.text}`}>
          Chọn mệnh giá nhanh:
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {denominations.map((value) => (
            <button
              key={value}
              onClick={() => handleSelectAmount(value)}
              className={`py-2 px-3 border ${theme.border} ${
                theme.rounded
              } text-sm ${
                amount === value
                  ? `${theme.background_card} ${theme.text}`
                  : `${theme.hover}`
              }`}
            >
              {formatCurrency(value)}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full ${theme.background_card} ${theme.text} py-2 ${theme.rounded} ${theme.hover} disabled:opacity-50`}
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </button>
      </div>
    </div>
  );
};

export default TopUpPage;
