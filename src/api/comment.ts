import { api } from ".";
import { CommentsResponse } from "../type/comment";

export const getCommentsByComicId = async (
  id: string,
  page: number,
  limit: number
): Promise<CommentsResponse> => {
  const result = await api.get(`/comment/story/${id}`, {
    params: {
      page,
      limit,
    },
  });
  return result?.data?.result;
};

export const postComment = async (
  id: string, 
  content: string,
  parentCommentId: string | null = null
) => {
  const result = await api.post("/comment/new", {
    storyId: id,
    content: content,
    parentCommentId: parentCommentId,
  });
  return result?.data?.result;
};

export const deleteComment = async (commentId: string) => {
  const result = await api.delete(`/comment/${commentId}`);
  return result?.data?.result;
};