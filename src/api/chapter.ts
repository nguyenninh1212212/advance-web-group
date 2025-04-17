import { api } from ".";

export const getChapterDetail = async (chapter_id: string) => {
  const res = await api.get(`/chapter/${chapter_id}`);
  return res.data;
};
export const getChapterProxy = async (chapter_id: string, ids: string[]) => {
  const query = ids.map((id) => `ids=${encodeURIComponent(id)}`).join("&");
  const url = `/chapter/${chapter_id}/proxy?${query}`;

  const res = await api.get(url);
  return res.data;
};
export const getChapterPrev = async (chapter_id: string) => {
  const res = await api.get(`/chapter/${chapter_id}/prev`);
  return res.data;
};
export const getChapterNext = async (chapter_id: string) => {
  const res = await api.get(`/chapter/${chapter_id}/next`);
  return res.data;
};
export const postChapter = async (formData: FormData) => {
  const response = await api.post("/chapter/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
