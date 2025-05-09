import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import { BiSort } from "react-icons/bi";
import { useTheme } from "../../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getWithdraw } from "../../../api/withdraw";

const PaymentHistory = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("PENDING"); // Ví dụ status ban đầu là "PENDING"

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
      <div className="flex justify-between items-center mb-6">
        <CardTitle title="Payment History" />
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() =>
              setStatus(status === "PENDING" ? "COMPLETED" : "PENDING")
            }
          >
            <BiSort /> Sort
          </button>
        </div>
      </div>

      {/* Tabs */}

      {/* Table Header */}
      <div className="grid grid-cols-4 py-2 text-gray-400 uppercase text-sm border-b border-gray-700">
        <div>Activity</div>
        <div>Mode</div>
        <div>Date</div>
        <div className="text-right">Amount</div>
      </div>

      {/* Transactions List */}
      {transactions &&
        transactions.data.map((t: any, index: number) => (
          <div
            key={index}
            className={`grid grid-cols-4 py-4 items-center border-b border-gray-800 ${theme.hover}`}
          >
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-yellow-400" />
              {t.activity}
            </div>
            <div className="capitalize text-sm">{t.mode}</div>
            <div className="text-sm">{t.date}</div>
            <div
              className={`text-right font-semibold ${
                t.amount > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ${Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
        ))}

      <p className="mt-4 text-sm text-gray-500">
        Showing 1-{transactions?.data.length} of 200 transactions
      </p>
    </div>
  );
};

export default PaymentHistory;
