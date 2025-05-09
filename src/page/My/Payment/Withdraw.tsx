import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { postWithdraw } from "../../../api/withdraw";
import { BankRequest } from "../../../type/bank";
import { useToast } from "../../../util/ToastContext";
import CardTitle from "../../../components/card/CardTitle";

const Withdraw = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [amountRequest, setAmountRequest] = useState<number>(0);
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationKey: ["withdrawPost"],
    mutationFn: (bankRequest: BankRequest) => postWithdraw(bankRequest),
    onSuccess: () => showToast("Rut tien thanh cong", "success"),
    onError: () => showToast("Rut tien that bai", "error"),
  });

  const handleWithdraw = () => {
    if (!accountNumber || !bankName || !accountHolder || amountRequest <= 0) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const bankRequest: BankRequest = {
      bankName,
      accountNumber,
      accountName: accountHolder,
      amountRequest,
    };
    mutation.mutate(bankRequest);
  };

  // Gửi yêu cầu rút tiền theo kiểu BankRequest

  return (
    <div className="min-h-screen  text-white flex items-center justify-center px-4 flex-col gap-2">
      <CardTitle title="Rút tiền" />
      <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Rút tiền</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Số tài khoản
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số tài khoản"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Ngân hàng
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên ngân hàng"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Tên chủ tài khoản
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên chủ tài khoản"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Số tiền rút
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số tiền rút"
              value={amountRequest}
              onChange={(e) => setAmountRequest(Number(e.target.value))}
            />
          </div>
        </div>

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          onClick={handleWithdraw}
        >
          Rut tien
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
