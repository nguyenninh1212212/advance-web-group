export interface card {
  id: string;
  title: string;
  chapter: string[];
  image: string;
  time: string[];
  view: number;
  cmt: number;
  like: number;
}

export interface payload {
  data: card;
  message: string;
}
