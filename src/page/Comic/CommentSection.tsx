import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentsByComicId,
  postComment,
  deleteComment,
} from "../../api/comment";
import { CommentsResponse } from "../../type/comment";

interface CommentProps {
  comicId: string;
}

const CommentSection: React.FC<CommentProps> = ({ comicId }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(0); // Quản lý trang hiện tại
  const queryClient = useQueryClient();

  // Lấy role từ localStorage
  const role = JSON.parse(localStorage.getItem("role") || "[]");

  // Fetch comments với phân trang
  const { data: commentsData, isLoading } = useQuery<CommentsResponse, Error>({
    queryKey: ["comments", comicId, currentPage],
    queryFn: ({ queryKey }) => {
      const [, comicId, currentPage] = queryKey as [string, string, number];
      return getCommentsByComicId(comicId, currentPage, 5);
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity, // Giữ dữ liệu cho đến khi có dữ liệu mới
  });

  const comments = commentsData?.content || [];
  const totalPages = commentsData?.totalPages || 1;

  const postCommentMutation = useMutation({
    mutationFn: ({
      content,
      parentCommentId,
    }: {
      content: string;
      parentCommentId: string | null;
    }) => postComment(comicId, content, parentCommentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comicId] });
      setNewComment("");
      setReplyContent({});
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comicId] });
    },
  });

  const handleReplyChange = (commentId: string, value: string) => {
    setReplyContent((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = (parentCommentId: string) => {
    const content = replyContent[parentCommentId];
    if (content) {
      postCommentMutation.mutate({ content, parentCommentId });
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div className="space-y-4 mt-6">
      {/* Form bình luận mới */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Viết bình luận</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nội dung bình luận..."
          className="w-full p-3 bg-gray-700 text-white rounded-md"
        />
        <button
          onClick={() =>
            postCommentMutation.mutate({
              content: newComment,
              parentCommentId: null,
            })
          }
          className="mt-3 px-4 py-2 bg-primary-200 text-white rounded-md"
        >
          Gửi bình luận
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Bình luận</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <img
                src={comment.imageUser || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
                crossOrigin="anonymous"
              />

              <div className="flex-1">
                <p className="font-semibold text-white">
                  {comment.fullUserName}
                </p>
                <p className="text-gray-300 text-sm">{comment.content}</p>

                {/* Actions */}
                <div className="mt-2 flex gap-3">
                  {(role.includes("ADMIN") || role.includes("AUTHOR")) && (
                    <button
                      onClick={() => deleteCommentMutation.mutate(comment.id)}
                      className="text-red-400 hover:underline text-sm"
                    >
                      Xoá
                    </button>
                  )}
                </div>

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <ul className="mt-4 space-y-3 pl-6 border-l border-gray-600">
                    {comment.replies.map((reply) => (
                      <li
                        key={reply.id}
                        className="bg-gray-700 p-3 rounded-md flex gap-3 items-start"
                      >
                        <img
                          src={reply.imageUser || "/default-avatar.png"}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover"
                          crossOrigin="anonymous"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-white">
                            {reply.fullUserName}
                          </p>
                          <p className="text-gray-300 text-sm">
                            {reply.content}
                          </p>
                          {(role.includes("ADMIN") ||
                            role.includes("AUTHOR")) && (
                            <button
                              onClick={() =>
                                deleteCommentMutation.mutate(reply.id)
                              }
                              className="text-red-400 hover:underline text-xs mt-1"
                            >
                              Xoá
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Reply form */}
                <div className="mt-4">
                  <textarea
                    value={replyContent[comment.id] || ""}
                    onChange={(e) =>
                      handleReplyChange(comment.id, e.target.value)
                    }
                    placeholder="Viết trả lời..."
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment.id)}
                    className="mt-2 px-4 py-2 bg-primary-200 text-white rounded-md"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="text-white">
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
