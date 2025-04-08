import React, { useState } from "react";

const Withdraw = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const handleWithdraw = () => {
    if (!accountNumber || !bankName || !accountHolder) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Gửi dữ liệu đến backend ở đây
    console.log("Withdraw request:", {
      accountNumber,
      bankName,
      accountHolder,
    });
    alert("Yêu cầu rút tiền đã được gửi!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-lg">
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
        </div>

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          onClick={handleWithdraw}
        >
          Rút tiền
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
