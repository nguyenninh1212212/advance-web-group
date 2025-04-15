import { api } from ".";

export const getCategory = async () => {
  const result = await api.get("/category");
  return result.data?.result;
};
