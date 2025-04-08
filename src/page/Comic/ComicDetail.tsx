import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaComment, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { formatNumber } from "../../util/format/formatNumber";
import { IChapter, IComicDetail } from "../../type/comic";
import { fakedata } from "../../FakeData/FakeDataComic";
import Popup from "../../components/popup/Popup";
import Purchase from "../../components/popup/Purchase";
import CardCategoryDetail from "../../components/card/CardCategoryDetail";
import { VscDebugStart } from "react-icons/vsc";

import ComicContainer from "./ComicContainer";
import Rate from "../../components/popup/Rate";

const ComicDetail: React.FC<IComicDetail> = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenRate, setIsOpenRate] = useState<boolean>(false);
  const data = fakedata.find((comic) => comic.id == id);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const navigate = useNavigate();
  const datamemo = useMemo(() => data, [data]);
  const [chapter, setChapter] = useState<IChapter>();

  const isPurchase = (chapter: IChapter) => {
    if (chapter.price > 0) {
      setIsOpen(!isOpen);
      setChapter(chapter);
    } else {
      navigate(`/${chapter.title}/chapter/${id}/${chapter.images}`);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data)
    return (
      <p className="text-center text-lg">
        Truyện không tồn tại "Chỉ có chainsaw man có dữ liệu"
      </p>
    );

  return (
    <div className="flex flex-col gap-4 min-h-screen ">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/3 w-full  md:pr-5 flex flex-col md:items-start items-center">
          <img
            className="md:h-96 md:w-72 w-5/6 h-1/2  rounded-xl object-cover "
            src={data.image}
            alt={data.title}
          />
          <div>
            <ul className="mt-2 text-stone-300 flex flex-col gap-1">
              <li className=" font-medium text-3xl text-white">
                {datamemo?.title}
              </li>
              <li>
                Tác giả: <span className="text-white">David Grayson</span>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setSeeMore(!seeMore)}
              >
                <p className={`text-white ${seeMore ? "" : "line-clamp-2"}`}>
                  <span className="text-stone-300">Mô tả: </span>
                  Lucia là một cô gái bình thường nhưng cô có thể nhìn thấy
                  tương lai qua những giấc mơ của mình Lucia là một cô gái bình
                  thường nhưng cô có thể nhìn thấy tương lai qua những giấc mơ
                  của mình Lucia là một cô gái bình thường nhưng cô có thể nhìn
                  thấy tương lai qua những giấc mơ của mình
                </p>
              </li>
              <li className="flex gap-1 ">
                Lượt xem:{" "}
                <span className=" flex items-center gap-1 text-white">
                  {formatNumber(data.view)} <FaEye />
                </span>
              </li>
              <li className="flex gap-1">
                Đánh giá:{" "}
                <span className="flex items-center gap-1 text-white">
                  {formatNumber(data.cmt)} <FaStar />
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
              <span className="text-stone-300">Tag :</span>
              {datamemo?.categoties.map((category) => (
                <CardCategoryDetail key={category.id} name={category.name} />
              ))}
            </section>
          </div>
          <div className=" h-auto overflow-y-auto scrollbar-hide p-3">
            {data.chapter.map((chap: IChapter) => (
              <div
                key={chap.id}
                className="flex justify-between items-center hover:bg-stone-500 rounded-lg p-2 cursor-pointer"
                onClick={() => isPurchase(chap)}
              >
                <div className="flex items-center gap-2 my-3">
                  <div>
                    <p>{chap.title}</p>
                    <p className="text-white">{chap.createdAt}</p>
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
      <ComicContainer />
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
