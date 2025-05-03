import { api } from ".";

export const getProfile = async () => {
  const res = await api.get("/my/profile");
  return res.data;
};
