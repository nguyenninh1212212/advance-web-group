import { api } from ".";

export const getfavorites = async () => {
  const res = await api.get("/favorites");
  return res?.data.result;
};

export const isFollowComic = async (id: string) => {
  const res = await api.get(`/favorites/stories/${id}`);
  console.log(res);
  return res?.data.result;
}

export const toggleFollowComic = async (id: string) => {
  const res = await api.post(`/favorites/${id}`);
  return res?.data.result;
}