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
  const result = await api.get(`/search/story_cate/${id}`, {
    params: {
      page,
      limit,
    },
  });
  return result?.data?.result;
};

export const postStory = async (formData: FormData) => {
  const response = await api.post("/story/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
