import { Page } from "./page";

export interface Icard {
  chapters: IChapter[];
  story: IStoryHistory;
}

export interface IChapterDetail {
  content: string;
  title: string;
  price: string;
  images: IImage[];
}
export interface category {
  id: string;
  name: string;
}
export interface IImage {
  id: string;
  url: string;
}
export interface IChapter {
  id: string;
  title: string;
  price: number;
  images: IImage;
  createdAt: string;
  read: boolean;
}
export interface IChapterDetail {
  id: string;
  title: string;
  content: string;
  images: IImage[];
}
export interface IComicDetail {
  id: string;
  title: string;
  categoties: category[];
  chapter: IChapter[];
  image: string;
  time: string[];
  view: number;
  cmt: number;
  like: number;
}

export interface IPayloadComic {
  message: string;
  data: Page<IComicDetail>;
}

export interface payload {
  data: Icard;
  message: string;
}

export interface IHistory {
  id: string;
  title: string;
  chapter: IChapter[];
}

// Interface cho từng item
export interface ICategory {
  id: string;
  name: string;
}

export type StoryType = "NOVEL" | "COMIC"; // Nếu có thể có nhiều loại, thêm vào đây
export type StoryStatus = "UPDATING" | "COMPLETED" | "PAUSED"; // Cập nhật theo hệ thống bạn dùng

export interface IStory {
  id: string;
  title: string;
  type: StoryType;
  status: StoryStatus;
  view: number;
  visibility: boolean;
  isAvailble: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  coverImage: string;
  categories: ICategory[];
}
export interface IStoryHistory {
  id: string;
  title: string;
  status: StoryStatus;
  visibility: boolean;
  coverImage: string;
}
// Interface cho phản hồi toàn bộ từ API
export interface IStoriesResponse {
  data: IStory[];
  limit: number;
  page: number;
  total: number;
}
