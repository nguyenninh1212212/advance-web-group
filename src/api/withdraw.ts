import { api } from ".";
import { BankRequest } from "../type/bank";

export const postWithdraw = async (BankRequest: BankRequest) => {
  await api.post("/withdraw", { body: BankRequest });
};
export const putWithdraw = async (id: string, status: string) => {
  await api.post(`/withdraw/${id}`, { params: status });
};
export const getWithdraw = async (status: string) => {
  return await api.get(`/withdraw`, { params: status });
};
