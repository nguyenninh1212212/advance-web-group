import { api } from ".";

export const getStories = async (page: number, limit: number) => {
  const result = await api.get("/stories", {
    params: { page, limit },
  });
  return result.data;
};
