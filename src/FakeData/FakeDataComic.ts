import { IComicDetail } from "../type/comic";

export const fakedata: IComicDetail[] = [
  {
    id: "1",
    title: "Chainsaw man",
    categoties: [
      { id: "9", name: "Fantasy" },
      { id: "10", name: "Supernatural" },
      { id: "11", name: "Action" },
    ],
    chapter: [
      {
        id: "250",
        title: "Chapter 250",
        price: 1.3,
        images: {
          id: "img5",
          url: "https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17",
        },
        createdAt: "03/02/2025",
      },
      {
        id: "2511",
        title: "Chapter 249",
        price: 0,
        images: {
          id: "img5",
          url: "https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17",
        },
        createdAt: "02/02/2025",
      },
      {
        id: "2522",
        title: "Chapter 248",
        price: 0,
        images: {
          id: "img5",
          url: "https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17",
        },
        createdAt: "01/02/2025",
      },
      {
        id: "25022",
        title: "Chapter 248",
        price: 0,
        images: {
          id: "img5",
          url: "https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17",
        },
        createdAt: "01/02/2025",
      },
    ],
    image:
      "https://jumpg-assets.tokyo-cdn.com/secure/title/100037/title_thumbnail_portrait_list/312145.jpg?hash=7xViY-tfvvtYqgKJ2vjMCA&expires=2145884400",
    time: ["10 days ago"],
    view: 4200000,
    cmt: 10000,
    like: 220000,
  },
];
