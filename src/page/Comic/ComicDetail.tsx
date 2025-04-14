import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaComment, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { ICategory, IChapter, IComicDetail } from "../../type/comic";
import Popup from "../../components/popup/Popup";
import Purchase from "../../components/popup/Purchase";
import CardCategoryDetail from "../../components/card/CardCategoryDetail";
import { VscDebugStart } from "react-icons/vsc";

import Rate from "../../components/popup/Rate";
import { useTheme, statusTheme, typeTheme } from "../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "../../api/stories";

const ComicDetail: React.FC<IComicDetail> = () => {
  const { id } = useParams<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenRate, setIsOpenRate] = useState<boolean>(false);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<IChapter>();
  const theme = useTheme();

  const isPurchase = (chapter: IChapter) => {
    if (chapter.price > 0) {
      setIsOpen(!isOpen);
      setChapter(chapter);
    } else {
      navigate(`/${chapter.title}/chapter/${id}/${chapter.images}`);
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["comicDetail", id],
    queryFn: () => getStoryById(id as string),
    enabled: !!id,
  });

  console.log("🚀 ~ story detail:", data, error, isLoading);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen ">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/3 w-full  md:pr-5 flex flex-col md:items-start ">
          <img
            className="md:h-96 md:w-72 w-5/6 h-1/2  rounded-xl object-cover self-center"
            src={data.coverImage}
            alt={data.title}
          />
          <div>
            <ul className={`mt-2  flex flex-col gap-1 ${theme.text}`}>
              <li className={`font-medium text-3xl ${theme.text}`}>
                {data.title}
              </li>
              <li>
                Tác giả:{" "}
                <span className={`${theme.text}`}>{data.author.fullName}</span>
              </li>
              <li>
                Trạng thái:{" "}
                <span
                  className={`${theme.text} p-[2x] px-1 rounded-md ${
                    statusTheme[data.status]
                  }`}
                >
                  {data.status}
                </span>
              </li>
              <li>
                Kiểu truyện:{" "}
                <span
                  className={`text-white p-[2x] px-1 rounded-md ${
                    typeTheme[data.type]
                  }`}
                >
                  {data.type}
                </span>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setSeeMore(!seeMore)}
              >
                <p className={`${theme.text} ${seeMore ? "" : "line-clamp-2"}`}>
                  <span>Mô tả: </span>
                  {data.description}
                </p>
              </li>
              <li className="flex gap-1 ">
                Lượt xem:{" "}
                <span className={` flex items-center gap-1 ${theme.text}`}>
                  {data.views} <FaEye />
                </span>
              </li>
              <li className="flex gap-1">
                Đánh giá:{" "}
                <span className={` flex items-center gap-1 ${theme.text}`}>
                  {data.rate} <FaStar />
                </span>
              </li>
              <li className="flex p-2">
                <ul className="flex gap-4 text-2xl mt-2">
                  <li className="flex flex-col items-center">
                    <FaHeart className="cursor-pointer" />
                    <p className="text-sm text-zinc-400">Theo dõi</p>
                  </li>
                  <li className="flex flex-col items-center">
                    <VscDebugStart className="cursor-pointer " />
                    <p className="text-sm text-zinc-400">Đọc từ đầu</p>
                  </li>
                  <li className="flex flex-col items-center">
                    <FaStar
                      className="cursor-pointer"
                      onClick={() => setIsOpenRate(!isOpenRate)}
                    />
                    <p className="text-sm text-zinc-400">Đánh giá</p>
                  </li>
                  <li className="flex flex-col items-center">
                    <FaComment
                      className="cursor-pointer"
                      onClick={() => setIsOpenRate(!isOpenRate)}
                    />
                    <p className="text-sm text-zinc-400">Bình luận</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Danh sách chapter */}
        <div className="md:w-2/3">
          <div className="border-b-2 border-stone-500 w-auto pb-2">
            <section className="flex flex-wrap gap-2  mt-2">
              <span className={`${theme.text}`}>Tag :</span>
              {data?.categories.map((category: ICategory) => (
                <CardCategoryDetail key={category.id} name={category.name} />
              ))}
            </section>
          </div>
          <div className=" h-auto overflow-y-auto scrollbar-hide p-3">
            {data.chapter.map((chap: IChapter) => (
              <div
                key={chap.id}
                className={`flex justify-between items-center hover:bg-stone-400 rounded-lg p-2 cursor-pointer"`}
                onClick={() => isPurchase(chap)}
              >
                <div className="flex items-center gap-2 my-3">
                  <div>
                    <p>{chap.title}</p>
                    <p className={`${theme.text}`}>{chap.createdAt}</p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    chap.price > 0 ? "text-orange-500" : "text-green-500"
                  }`}
                >
                  {chap.price > 0 ? `${chap.price} $` : "FREE"}
                </p>
              </div>
            ))}
          </div>
          {data.chapter.length > 4 && (
            <p className="text-center text-sm text-gray-500">Xem thêm</p>
          )}
        </div>
      </div>
      {/* <ComicContainer data={""} /> */}
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        backgroundColor="bg-gray-800"
      >
        {chapter ? <Purchase chap={chapter} /> : null}
      </Popup>
      <Popup
        isOpen={isOpenRate}
        setIsOpen={setIsOpenRate}
        backgroundColor="bg-gray-800"
        children={<Rate />}
      />
      {/* Thể loại */}
      <div className="flex w-full rounded-lg "></div>
    </div>
  );
};

export default ComicDetail;
