import { Page } from "./page";

export interface Icard {
  id: string;
  title: string;
  chapter: string[];
  image: string;
  time: string[];
  view: number;
  cmt: number;
  like: number;
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
