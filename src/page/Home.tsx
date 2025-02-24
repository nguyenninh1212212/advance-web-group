import React from "react";
import CardComic from "../components/card/CardComic";

const Home = () => {
  const fakedata = [
    {
      id: "1",
      title: "One Piece",
      chapter: "Chapter 1100",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg",
      time: "10 days ago",
    },
    {
      id: "2",
      title: "Naruto",
      chapter: "Chapter 700",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqIaD4wuVHsK6dbGQlEC4MBycX72MfyVLoMg&s",
      time: "10 days ago",
    },
    {
      id: "3",
      title: "Attack on Titan",
      chapter: "Chapter 139",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-aHR-SlFEkjXQglZ0NZC3QfNslKXA6myRg&s",
      time: "10 days ago",
    },
    {
      id: "4",
      title: "Demon Slayer",
      chapter: "Chapter 205",
      image:
        "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      time: "10 days ago",
    },
    {
      id: "5",
      title: "Jujutsu Kaisen",
      chapter: "Chapter 250",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpNb19Dh9wj69-Z-QXywCo1rNVGXAKNCCphQ&s",
      time: "10 days ago",
    },
    {
      id: "5",
      title: "Jujutsu Kaisen",
      chapter: "Chapter 250",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpNb19Dh9wj69-Z-QXywCo1rNVGXAKNCCphQ&s",
      time: "10 days ago",
    },
    {
      id: "5",
      title: "Jujutsu Kaisen",
      chapter: "Chapter 250",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpNb19Dh9wj69-Z-QXywCo1rNVGXAKNCCphQ&s",
      time: "10 days ago",
    },
  ];

  return (
    <div className="text-black flex w-full gap-3 h-full">
      <div className="w-5/6 flex-col flex gap-2">
        <div>
          <p className="p-1 mb-1 w-32 text-white rounded-sm bg-primary-200 text-center">
            Đề cử
          </p>
          <div className="w-full h-52 bg-white rounded-lg flex py-2  overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-proximity ">
            {fakedata.map((e, _i) => (
              <div key={_i} className="snap-start">
                <CardComic data={e} message={""} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="p-1 w-32 mb-1 text-white rounded-sm bg-primary-200 text-center">
            Đề cử
          </p>
          <div className="w-full h-72 bg-yellow-400 rounded-lg"></div>
        </div>
      </div>
      <div className=" w-4/5 bg-blue-500 rounded-lg"></div>
    </div>
  );
};

export default Home;
