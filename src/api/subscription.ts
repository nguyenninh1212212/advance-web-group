import { api } from ".";

export const getSubsctiption = async () => {
  const res = await api.get("/subscription");
  return res.data;
};

export const TakeSubscriptionPlan = async (id_plan: string) => {
  const res = await api.post("/subscription/upgrade", { id_plan });
  return res.data;
};
