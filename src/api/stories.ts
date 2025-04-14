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

export const getStoryById = async (id: string) => {
  const result = await api.get(`/story/detail/${id}`);
  return result.data.result;
};

export const getMyList = async () => {
  const result = await api.get("/my/list");
  return result?.data.result;
};

export const getStoriesByCate = async (
  id: string,
  page: number,
  limit: number
) => {
  const result = await api.get(`/search/story_cate/${id}?page=0&limit=10`);
  return result?.data?.result;
};
