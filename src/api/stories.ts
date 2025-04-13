import { api } from ".";

export const getHomepage = async () => {
  const result = await api.get("/homepage");
  return result.data.result;
};

export const getStories = async (page: number, limit: number) => {
  const result = await api.get("/story", {
    params: { page, limit },
  });
  return result.data;
};
