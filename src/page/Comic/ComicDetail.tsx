import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { formatNumber } from "../../util/format/formatNumber";
import { IChapter, IComicDetail } from "../../type/comic";
import { fakedata } from "../../FakeData/FakeDataComic";
import CardCategory from "../../components/card/CardCategory";

const ComicDetail: React.FC<IComicDetail> = () => {
  const { id } = useParams();
  const data = fakedata.find((comic) => comic.id == id);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const datamemo = useMemo(() => data, [data]);
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
      <div className="flex gap-4">
        {/* Thông tin truyện */}
        <div className="w-1/3 pr-5 flex flex-col items-start">
          <img
            className="h-96 w-72 rounded-xl"
            src={data.image}
            alt={data.title}
          />
          <ul className="mt-2 text-stone-500 flex flex-col gap-1">
            <li className="text-black font-medium text-3xl">
              {datamemo?.title}
            </li>
            <li>
              Tác giả: <span className="text-black">David Grayson</span>
            </li>
            <li className="cursor-pointer" onClick={() => setSeeMore(!seeMore)}>
              <p className={`text-black ${seeMore ? "" : "line-clamp-2"}`}>
                <span className="text-stone-500">Mô tả: </span>
                Lucia là một cô gái bình thường... nhưng cô có thể nhìn thấy
                tương lai qua những giấc mơ của mình... Lucia là một cô gái bình
                thường... nhưng cô có thể nhìn thấy tương lai qua những giấc mơ
                của mình... Lucia là một cô gái bình thường... nhưng cô có thể
                nhìn thấy tương lai qua những giấc mơ của mình...
              </p>
            </li>
            <li className="flex gap-1">
              Lượt xem:{" "}
              <span className="text-black flex items-center gap-1">
                {formatNumber(data.view)} <FaEye />
              </span>
            </li>
            <li className="flex gap-1">
              Đánh giá:{" "}
              <span className="text-black flex items-center gap-1">
                {formatNumber(data.cmt)} <BiComment />
              </span>
            </li>
          </ul>
          <section className="flex flex-wrap gap-2  mt-2">
            <span className="text-stone-500">Tag :</span>
            {datamemo?.categoties.map((category) => (
              <CardCategory key={category.id} name={category.name} />
            ))}
          </section>
        </div>

        {/* Danh sách chapter */}
        <div className="w-2/3">
          <div className="border-b-2 border-stone-500 w-auto pb-2">
            <p className="text-white p-2 rounded-md w-auto bg-primary-200 inline-block">
              {data.chapter[0]?.title}
            </p>
          </div>
          <div className="border-2 border-gray-200 rounded-lg h-auto overflow-y-auto scrollbar-hide p-3">
            {data.chapter.map((chap: IChapter) => (
              <Link
                key={chap.id}
                to={`/${data.title}/chapter/${chap.id}/${chap.images.id}`}
                state={{ chapId: chap.id }}
                className="flex justify-between items-center hover:bg-stone-400 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={chap.images.url}
                    alt=""
                    className="rounded-xl w-20 h-20"
                  />
                  <div>
                    <p>{chap.title}</p>
                    <p className="text-gray-400">{chap.createdAt}</p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    chap.price > 0 ? "text-orange-500" : "text-green-500"
                  }`}
                >
                  {chap.price > 0 ? `${chap.price} $` : "FREE"}
                </p>
              </Link>
            ))}
          </div>
          {data.chapter.length > 4 && (
            <p className="text-center text-sm text-gray-500">Xem thêm...</p>
          )}
          <section className="w-full border-t border-stone-500 ">
            <p className="font-bold text-xl my-2">Truyện liên quan:</p>
            <div className="w-56 rounded-lg overflow-hidden my-2 p-3 bg-stone-400 text-white">
              <img src={datamemo?.image} alt="" />
              <p>{datamemo?.title}</p>
            </div>
          </section>
        </div>
      </div>

      {/* Thể loại */}
      <div className="flex w-full rounded-lg "></div>
    </div>
  );
};

export default ComicDetail;
