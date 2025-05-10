import { api } from ".";
import { BankRequest } from "../type/bank";

export const postWithdraw = async (bankRequest: BankRequest) => {
  await api.post("/withdraw/post", bankRequest);
};

export const putWithdraw = async (id: string, status: string) => {
  await api.post(`/withdraw/${id}`, { params: status });
};
export const getWithdraw = async (status: string) => {
  return await api.get(`/withdraw`, { params: { status } });
};
export const getPurchase = async (page: number, limit: number) => {
  const res = await api.get(`/purchase-history`, { params: { page, limit } });
  return res?.data;
};
export const getAppendMoney = async (page: number, size: number) => {
  const res = await api.get(`/wallet`, { params: { page, size } });
  return res?.data;
};
