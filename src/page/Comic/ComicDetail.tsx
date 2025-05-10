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
import ClipLoader from "react-spinners/ClipLoader";
import CommentSection from "./CommentSection";
import { isFollowComic, toggleFollowComic } from "../../api/favorites";
import { useToast } from "../../util/ToastContext";

const ComicDetail: React.FC<IComicDetail> = () => {
  const { id } = useParams<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRate, setIsOpenRate] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [chapter, setChapter] = useState<IChapter>();
  const [limit, setLimit] = useState(10);

  const theme = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["comicDetail", id],
    queryFn: () => getStoryById(id as string, 0, limit),
    enabled: !!id,
  });

  // refetch mỗi khi limit thay đổi
  useEffect(() => {
    if (id) refetch();
  }, [limit, id, refetch]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsFollowed(false);
        return;
      }
      const response = await isFollowComic(id as string);
      setIsFollowed(response);
    };
    checkFollowStatus();
  }, [id]);

  const handleFollow = async () => {
    try {
      const response = await toggleFollowComic(id as string);
      if (response) {
        setIsFollowed(true);
        showToast("Bạn đã theo dõi truyện thành công!", "success");
      } else {
        setIsFollowed(false);
        showToast("Bạn đã bỏ theo dõi truyện!", "info");
      }
    } catch (error) {
      showToast("Có lỗi xảy ra khi thay đổi trạng thái theo dõi!", "error");
    }
  };

  const handleContinue = () => {
    navigate(`/${data?.title}/chapter/${data?.continueReading}`);
  };

  const isPurchase = (chap: IChapter) => {
    if (chap.price > 0) {
      setChapter(chap);
      setIsOpen(true);
    } else {
      navigate(`/${data?.title}/chapter/${chap.id}`);
    }
  };

  if (isLoading) {
    return (
      <div>
        <ClipLoader
          color="gray"
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={isLoading}
          size={50}
        />
      </div>
    );
  }

  if (error) return <div>Error khi tải truyện</div>;

  if (data?.chapter.length > 0) {
    localStorage.setItem("id_story", data.id);
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="flex md:flex-row flex-col gap-4">
        {/* Bên trái: Thông tin truyện */}
        <div className="md:w-1/3 w-full md:pr-5 flex flex-col md:items-start">
          <img
            className="md:h-96 md:w-72 w-5/6 h-1/2 rounded-xl object-cover self-center"
            src={data.coverImage}
            alt={data.title}
          />
          <ul className={`mt-2 flex flex-col gap-1 ${theme.text}`}>
            <li className="font-medium text-3xl">{data.title}</li>
            <li>
              Tác giả:{" "}
              <span
                onClick={() => navigate(`/author/detail/${id}`)}
                className="cursor-pointer"
              >
                {data.author.fullName}
              </span>
            </li>
            <li>
              Trạng thái:{" "}
              <span
                className={`text-white px-1 rounded-md ${
                  statusTheme[data.status]
                }`}
              >
                {data.status}
              </span>
            </li>
            <li>
              Kiểu truyện:{" "}
              <span
                className={`text-white px-1 rounded-md ${typeTheme[data.type]}`}
              >
                {data.type}
              </span>
            </li>
            <li onClick={() => setSeeMore(!seeMore)} className="cursor-pointer">
              <p className={seeMore ? "" : "line-clamp-2"}>
                <span>Mô tả: </span>
                {data.description}
              </p>
            </li>
            <li className="flex gap-1">
              Lượt xem:{" "}
              <span className="flex items-center gap-1">
                {data.views} <FaEye />
              </span>
            </li>
            <li className="flex gap-1">
              Đánh giá:{" "}
              <span className="flex items-center gap-1">
                {data.rate} <FaStar />
              </span>
            </li>
            <li className="flex p-2">
              <ul className="flex gap-4 text-2xl mt-2">
                <li className="flex flex-col items-center">
                  <FaHeart
                    className={`cursor-pointer ${
                      isFollowed ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={handleFollow}
                  />
                  <p
                    className="text-sm text-zinc-400 cursor-pointer"
                    onClick={handleFollow}
                  >
                    {isFollowed ? "Bỏ theo dõi" : "Theo dõi"}
                  </p>
                </li>
                <li
                  className="flex flex-col items-center"
                  onClick={handleContinue}
                >
                  <VscDebugStart className="cursor-pointer" />
                  <p className="text-sm text-zinc-400">Đọc tiếp</p>
                </li>
                <li className="flex flex-col items-center">
                  <FaStar
                    onClick={() => setIsOpenRate(!isOpenRate)}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-zinc-400">Đánh giá</p>
                </li>
                <li className="flex flex-col items-center">
                  <FaComment
                    onClick={() => setIsOpenRate(!isOpenRate)}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-zinc-400">Bình luận</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Bên phải: Chapter */}
        <div className="md:w-2/3">
          <div className="border-b-2 border-stone-500 w-auto pb-2">
            <section className="flex flex-wrap gap-2 mt-2">
              <span className={`${theme.text}`}>Tag:</span>
              {data.categories.map((category: ICategory) => (
                <CardCategoryDetail
                  key={category.id}
                  name={category.name}
                  id={category.id}
                />
              ))}
            </section>
          </div>

          <div className="h-auto overflow-y-auto scrollbar-hide p-3">
            {data.chapter.length > 0 ? (
              data.chapter.map((chap: IChapter) => (
                <div
                  key={chap.id}
                  className={`flex justify-between items-center my-1 hover:bg-stone-400 rounded-lg p-2 cursor-pointer ${
                    chap.read ? `${theme.background_card}` : ""
                  }`}
                  onClick={() => isPurchase(chap)}
                >
                  <div>
                    <p>{chap.title}</p>
                    <p className={`${theme.text}`}>{chap.createdAt}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      chap.price > 0 ? "text-orange-500" : "text-green-500"
                    }`}
                  >
                    {chap.price > 0 ? `${chap.price} $` : "FREE"}
                  </p>
                </div>
              ))
            ) : (
              <p>Truyện chưa có chapter nào</p>
            )}
          </div>

          {data.chapter.length >= limit && (
            <p
              className="text-center text-sm text-gray-500 cursor-pointer"
              onClick={() => setLimit((prev) => prev + 10)}
            >
              Xem thêm
            </p>
          )}
        </div>
      </div>

      {/* Popup mua chapter */}
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        backgroundColor="bg-gray-800"
      >
        {chapter && <Purchase chap={chapter} id={id as string} />}
      </Popup>

      {/* Popup đánh giá */}
      <Popup
        isOpen={isOpenRate}
        setIsOpen={setIsOpenRate}
        backgroundColor="bg-gray-800"
        children={<Rate />}
      />

      {/* Bình luận */}
      <div className="flex flex-col gap-3">
        <CommentSection comicId={id as string} />
      </div>
    </div>
  );
};

export default ComicDetail;
