import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import CardTitle from "../../../components/card/CardTitle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import {
  getAppendMoney,
  getPurchase,
  getWithdraw,
} from "../../../api/withdraw";
import Pagination from "../../../util/pagebar/page";

const PaymentHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PENDING");
  const [tab, setTab] = useState<"withdraw" | "purchase" | "appendMoney">(
    "withdraw"
  );
  const [page, setPage] = useState(0);

  // Lấy danh sách giao dịch rút tiền
  const {
    data: transactions,
    isLoading: isLoadingWithdraw,
    error: errorWithdraw,
  } = useQuery({
    queryKey: ["payment", status],
    queryFn: () => getWithdraw(status),
  });

  // Lấy danh sách giao dịch mua truyện
  const {
    data: purchase,
    isLoading: isLoadingPurchase,
    error: errorPurchase,
  } = useQuery({
    queryKey: ["purchase", page],
    queryFn: () => getPurchase(page, 10),
  });

  // Lấy danh sách giao dịch append money
  const {
    data: appendMoney,
    isLoading: isLoadAppend,
    error: errorAppend,
  } = useQuery({
    queryKey: ["appendMoney", page],
    queryFn: () => getAppendMoney(page, 10),
  });

  console.log("🚀 ~ PaymentHistory ~ errorAppend:", errorAppend);
  console.log("🚀 ~ PaymentHistory ~ isLoadAppend:", isLoadAppend);
  console.log("🚀 ~ PaymentHistory ~ appendMoney:", appendMoney);

  const purchaseHis = purchase?.result;

  if (
    (tab === "withdraw" && isLoadingWithdraw) ||
    (tab === "purchase" && isLoadingPurchase) ||
    (tab === "appendMoney" && isLoadAppend)
  ) {
    return <div>Loading...</div>;
  }

  if (
    (tab === "withdraw" && errorWithdraw) ||
    (tab === "purchase" && errorPurchase) ||
    (tab === "appendMoney" && errorAppend)
  ) {
    return <div>Error loading data</div>;
  }

  const swt =
    tab === "withdraw"
      ? transactions?.data.result
      : tab === "purchase"
      ? purchaseHis
      : appendMoney?.result;

  return (
    <div className={`p-6 min-h-screen mb-2 ${theme.text}`}>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <CardTitle title="Lịch sử giao dịch" />
        {tab === "withdraw" && (
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
        )}
      </div>

      {/* Tab switch */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "withdraw"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setTab("withdraw")}
        >
          Giao dịch rút tiền
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "purchase"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setTab("purchase")}
        >
          Giao dịch mua truyện
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "appendMoney"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setTab("appendMoney")}
        >
          Giao dịch bổ sung tiền
        </button>
      </div>

      {/* Hiển thị dữ liệu tương ứng */}
      {tab === "withdraw" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transactions?.data?.result?.data.map((t: any, index: number) => (
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
          </div>
        ))}

      {tab === "purchase" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        purchaseHis?.data?.map((p: any, index: number) => (
          <div
            key={index}
            className="my-4 p-6 bg-gray-700 rounded-lg shadow-lg text-white"
          >
            <div className="text-sm mb-2">
              <strong>Tên truyện:</strong> {p.storyTitle}
            </div>
            <div className="text-sm mb-2">
              <strong>Tên chapter:</strong> {p.chapterTitle}
            </div>
            <div className="text-sm mb-2">
              <strong>Ngay giao dịch:</strong> {p.created}
            </div>
            <div className="text-sm mb-2">
              <strong>Số tiền thanh toán:</strong> ${p.price}
            </div>
            <div className="text-sm mb-2">
              <strong>Số dư còn lại:</strong> ${p.balance}
            </div>
          </div>
        ))}

      {tab === "appendMoney" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        appendMoney?.result?.data?.map((a: any, index: number) => (
          <div
            key={index}
            className="my-4 p-6 bg-gray-600 rounded-lg shadow-lg text-white"
          >
            <div className="text-sm mb-2">
              <strong>Full Name:</strong> {a.fullName}
            </div>
            <div className="text-sm mb-2">
              <strong>Email:</strong> {a.email}
            </div>
            <div className="text-sm mb-2">
              <strong>Description:</strong> {a.description}
            </div>
            <div className="text-sm mb-2">
              <strong>Amount:</strong> ${a.amount}
            </div>
            <div className="text-sm mb-2">
              <strong>Balance:</strong> ${a.balance}
            </div>
            <div className="text-sm mb-2">
              <strong>Status:</strong> {a.status}
            </div>
          </div>
        ))}

      <Pagination
        initialPage={swt}
        onPageChange={(newPage: number) => setPage(newPage - 1)}
        totalPage={swt?.total}
      />

      {/* Số lượng giao dịch */}
      <p className="mt-4 text-sm text-gray-500">
        {tab === "withdraw"
          ? `Showing ${transactions?.data?.result?.data.length || 0} rút tiền`
          : tab === "purchase"
          ? `Showing ${purchaseHis?.data?.length || 0} giao dịch mua`
          : `Showing ${appendMoney?.result?.data.length || 0} bổ sung tiền`}
      </p>
    </div>
  );
};

export default PaymentHistory;
