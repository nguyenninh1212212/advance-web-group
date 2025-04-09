import { api } from ".";

export const getStories = async (page: number, limit: number) => {
  const result = await api.get("/story", {
    params: { page, limit },
  });
  return result.data;
};
