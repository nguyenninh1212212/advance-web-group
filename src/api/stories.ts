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

export const getStoryById = async (id: string, page: number, limit: number) => {
  const result = await api.get(`/story/detail/${id}`, {
    params: { page, limit },
  });
  return result.data.result;
};

export const getStoryOfAuthor = async (id: string) => {
  const result = await api.get(`/story/author/${id}`);
  return result.data.result;
};

export const getMyList = async () => {
  const result = await api.get("/my/list");
  return result?.data.result;
};
export const getMyTrashList = async () => {
  const result = await api.get("/my/list/trash");
  return result?.data.result;
};
export const deleteSoftStory = async (id: string) => {
  await api.put("/story/remove", { id });
};
export const restoreStory = async (id: string) => {
  await api.put("/story/restore", { id });
};
export const deleteStory = async (id: string) => {
  await api.delete("/story/delete", {
    data: { id },
  });
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
    timeout: 30000,
  });
  return response.data;
};

export const filterStory = async (
  filterFields: Map<string, string>,
  page: number,
  limit: number
) => {
  const filterObject = Object.fromEntries(filterFields);

  const response = await api.get("/search", {
    params: {
      page: page,
      limit: limit,
      ...filterObject,
    },
  });

  return response.data;
};

export const elasticSearch = async (
  keyword: string,
  page: number,
  limit: number
) => {
  const response = await api.get("/search/elastic", {
    params: {
      keyword: keyword,
      page: page,
      limit: limit,
    },
  });
  return response.data;
};

export const toggleVisibility = async (isVisibility: boolean, id: string) => {
  await api.patch("/story/visibility", null, {
    params: {
      isVisibility,
      id,
    },
  });
};

export const getLatestChapter = async (storyId: string) => {
  const response = await api.get("/my/continue-reading", {
    params: {
      story_id: storyId,
    },
  });

  return response.data;
};
export const getHistory = async () => {
  const response = await api.get("/my/history");
  return response.data;
};
