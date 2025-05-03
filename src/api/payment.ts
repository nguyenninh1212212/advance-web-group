import { api } from "./index";

interface PaymentRequest {
  amount: number;
}

interface PaymentResponse {
  code: number;
  message: string;
  result: {
    code: string;
    message: string;
    paymentUrl: string;
  };
}

export const paymentApi = async (
  credentials: PaymentRequest
): Promise<PaymentResponse> => {
  const response = await api.get<PaymentResponse>("/payment/vn-pay", {
    params: { amount: credentials.amount },
    withCredentials: true,
  });
  return response.data;
};

export const vnPayReturnApi = async ({ amount }: { amount: number }): Promise<void> => {
  const response = await api.post(`/payment/confirm/${amount}`, {
    withCredentials: true,
  });
  return response.data;
};