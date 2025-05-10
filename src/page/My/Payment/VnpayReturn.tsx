// src/pages/VnpayReturn.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vnPayReturnApi } from "../../../api/payment";

const VnpayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    const vnpTxnRef = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");

    const handleVnPayReturn = async () => {
      if (responseCode === "00" && vnpTxnRef && amount) {
        try {
          await vnPayReturnApi({ amount: parseInt(amount) / 100 }); // VNPAY trả về amount * 100
          alert("Thanh toán thành công!");
          window.location.href = "/my/payment-history"; // Chuyển hướng đến trang lịch sử thanh toán
        } catch (error) {
          console.error("Lỗi xác nhận giao dịch:", error);
          alert("Có lỗi khi xác nhận thanh toán.");
        }
      } else {
        alert("Thanh toán thất bại hoặc bị huỷ.");
        navigate("/payment/to-up");
      }
    };

    handleVnPayReturn();
  }, [navigate, searchParams]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold">Đang xử lý giao dịch...</h2>
    </div>
  );
};

export default VnpayReturn;
