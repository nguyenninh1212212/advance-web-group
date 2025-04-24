export interface IComment {
  id: string;
  content: string;
  userId: string;
  fullUserName: string;
  imageUser: string;
  createdAt: string;
  storyId: string;
  storyTitle: string;
  parentCommentId?: string | null;
  replies: IComment[];
  deleted: boolean;
}

export interface CommentsResponse {
  content: IComment[];
  totalPages: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
}