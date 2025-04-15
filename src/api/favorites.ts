import { api } from ".";

export const getfavorites = async () => {
  const res = await api.get("/favorites");
  return res?.data.result;
};
