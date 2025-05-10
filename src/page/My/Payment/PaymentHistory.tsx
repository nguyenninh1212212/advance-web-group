import React, { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getWithdraw } from "../../../api/withdraw";
import { GrStatusInfo } from "react-icons/gr";

const PaymentHistory = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("PENDING"); // Ví dụ status ban đầu là "PENDING"
  const navigate = useNavigate();

  // Sử dụng react-query để lấy danh sách giao dịch
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment", status],
    queryFn: () => getWithdraw(status),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading transactions</div>;
  }

  return (
    <div className={`p-6 min-h-screen mb-2 ${theme.text}`}>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <CardTitle title="Lịch sử giao dịch" />
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() =>
              setStatus(status === "PENDING" ? "COMPLETED" : "PENDING")
            }
          >
            <GrStatusInfo /> {status === "PENDING" ? "COMPLETED" : "PENDING"}
          </button>

          <button
            onClick={() => navigate("/withdraw/post")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            + Tạo yêu cầu rút tiền
          </button>
        </div>
      </div>

      {/* Hiển thị danh sách giao dịch dưới dạng cards */}
      {transactions &&
        transactions.data.result.data.map((t, index) => (
          <div
            key={index}
            className="my-4 p-6 bg-gray-800 rounded-lg shadow-lg text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaMoneyBillWave className="text-yellow-400" />
              <strong>{t.activity}</strong>
            </div>

            <div className="text-sm mb-2">
              <strong>Mode:</strong> {t.mode}
            </div>

            <div className="text-sm mb-2">
              <strong>Date:</strong> {new Date(t.createdAt).toLocaleString()}
            </div>

            <div className="text-sm mb-2">
              <strong>Amount:</strong>{" "}
              <span
                className={`${
                  t.amountWithdrawn > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ${Math.abs(t.amountWithdrawn).toFixed(2)}
              </span>
            </div>

            {/* Chi tiết giao dịch */}
            <div className="text-sm mb-2">
              <strong>Content:</strong> {t.content}
            </div>
            <div className="text-sm mb-2">
              <strong>Bank Name:</strong> {t.bankname}
            </div>
            <div className="text-sm mb-2">
              <strong>Commission Amount:</strong> {t.commissionAmount}
            </div>
            <div className="text-sm mb-2">
              <strong>Remaining Amount:</strong> {t.remainingAmount}
            </div>
            <div className="text-sm mb-2">
              <strong>Status:</strong> {t.status}
            </div>
            <div className="text-sm mb-2">
              <strong>Transaction Type:</strong> {t.type}
            </div>
            <div className="text-sm mb-2">
              <strong>Created At:</strong>{" "}
              {new Date(t.createdAt).toLocaleString()}
            </div>
          </div>
        ))}

      {/* Pagination or transaction count */}
      <p className="mt-4 text-sm text-gray-500">
        Showing 1-{transactions?.data.result.data.length} of{" "}
        {transactions?.data.result.data.length} transactions
      </p>
    </div>
  );
};

export default PaymentHistory;
