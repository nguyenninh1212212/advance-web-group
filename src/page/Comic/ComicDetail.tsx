import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { formatNumber } from "../../util/format/formatNumber";
import { IChapter, IComicDetail } from "../../type/comic";
import { fakedata } from "../../FakeData/FakeDataComic";
import Popup from "../../components/popup/Popup";
import Purchase from "../../components/popup/Purchase";
import CardCategoryDetail from "../../components/card/CardCategoryDetail";

const ComicDetail: React.FC<IComicDetail> = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const data = fakedata.find((comic) => comic.id == id);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const navigate = useNavigate();
  const datamemo = useMemo(() => data, [data]);

  const isPurchase = (price: number, title: string, idImages: string) => {
    if (price > 0) {
      setIsOpen(!isOpen);
    } else {
      navigate(`/${title}/chapter/${id}/${idImages}`);
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
                  Lucia là một cô gái bình thường... nhưng cô có thể nhìn thấy
                  tương lai qua những giấc mơ của mình... Lucia là một cô gái
                  bình thường... nhưng cô có thể nhìn thấy tương lai qua những
                  giấc mơ của mình... Lucia là một cô gái bình thường... nhưng
                  cô có thể nhìn thấy tương lai qua những giấc mơ của mình...
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
                  {formatNumber(data.cmt)} <BiComment />
                </span>
              </li>
              <li>
                <section className="flex flex-wrap gap-2  mt-2">
                  <span className="text-stone-300">Tag :</span>
                  {datamemo?.categoties.map((category) => (
                    <CardCategoryDetail
                      key={category.id}
                      name={category.name}
                    />
                  ))}
                </section>
              </li>
            </ul>
          </div>
        </div>

        {/* Danh sách chapter */}
        <div className="md:w-2/3">
          <div className="border-b-2 border-stone-500 w-auto pb-2">
            <p className="text-white p-2 rounded-md w-auto bg-primary-200 inline-block ">
              {data.chapter[0]?.title}
            </p>
          </div>
          <div className=" h-auto overflow-y-auto scrollbar-hide p-3">
            {data.chapter.map((chap: IChapter) => (
              <div
                key={chap.id}
                className="flex justify-between items-center hover:bg-stone-500 rounded-lg p-2 cursor-pointer"
                onClick={() => isPurchase(chap.price, chap.title, chap.id)}
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
            <p className="text-center text-sm text-gray-500">Xem thêm...</p>
          )}
        </div>
      </div>
      <section className="w-full border-t border-stone-500 ">
        <p className="font-bold text-xl my-2">Truyện liên quan:</p>
        <div className="w-56 rounded-lg overflow-hidden my-2 p-3 bg-stone-400 text-white">
          <img src={datamemo?.image} alt="" />
          <p>{datamemo?.title}</p>
        </div>
      </section>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
        <Purchase />
      </Popup>
      {/* Thể loại */}
      <div className="flex w-full rounded-lg "></div>
    </div>
  );
};

export default ComicDetail;
