import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import { BiSort } from "react-icons/bi";
import { useTheme } from "../../../util/theme/theme";

const transactions = [
  {
    activity: "Coorg Trip",
    mode: "Desponsite",
    date: "12 Jul 2020, 12:30 PM",
    amount: -52.9,
  },
  {
    activity: "Hotel Leela Palace",
    mode: "Purchase",
    date: "11 Jul 2020, 2:00 PM",
    amount: -18.9,
  },
  {
    activity: "Monthly Salary",
    mode: "Withdraw",
    date: "10 Jul 2020, 8:30 PM",
    amount: 9765.0,
  },
  {
    activity: "Xbox Purchase",
    mode: "card",
    date: "12 May 2020, 4:30 PM",
    amount: -198.9,
  },
];

const PaymentHistory = () => {
  const theme = useTheme();
  return (
    <div className={`p-6   min-h-screen mb-2 ${theme.text}`}>
      <div className="flex justify-between items-center mb-6">
        <CardTitle title="Payment History" />
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
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
      {transactions.map((t, index) => (
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
        Showing 1-{transactions.length} of 200 transactions
      </p>
    </div>
  );
};

export default PaymentHistory;
