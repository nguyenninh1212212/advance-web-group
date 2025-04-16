import ClipLoader from "react-spinners/ClipLoader";
import ImageReader from "./ImageReader";
import { getChapterDetail, getChapterProxy } from "../../api/chapter";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../util/theme/theme";
import Popup from "../../components/popup/Popup";
import Purchase from "../../components/popup/Purchase";
import DocxReader from "./DocxReader";

const Chapter: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<{ [key: number]: boolean }>({});
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const {
    data: chapterData,
    isLoading,
    error: errorChapter,
  } = useQuery({
    queryKey: ["chapter", id],
    queryFn: () => getChapterDetail(id as string),
  });

  const proxyData = useQuery({
    queryKey: ["proxy", id],
    queryFn: () => {
      const chapterId = chapterData?.result?.id;
      const fileIds = chapterData?.result?.files?.map((f) => f.id);
      return getChapterProxy(chapterId, fileIds);
    },
    enabled:
      !!chapterData?.result?.id && Array.isArray(chapterData?.result?.files),
  });
  console.log("🚀 ~ proxyData:", proxyData?.data);

  if (errorChapter) {
    return errorChapter.message;
  }

  const handleNextChapter = () => {
    const title = localStorage.getItem("title");
    navigate(`/${title}/chapter/${chapterData?.result.next}`);
  };

  const handlePrevChapter = () => {
    const title = localStorage.getItem("title");
    navigate(`/${title}/chapter/${chapterData?.result.prev}`);
  };

  if (isLoading || proxyData?.isLoading)
    return (
      <div>
        <ClipLoader
          color={"gray"}
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  const isPrev = chapterData?.result.prev == null ? true : false;
  const isNext = chapterData?.result.next == null ? true : false;
  return (
    <div className="text-black flex flex-col justify-between">
      <div className="max-w-5xl mx-auto flex-grow">
        <div className={`${theme.text} grid grid-cols-3 justify-center`}>
          <p className={`p-2 text-center ${theme.background_card} w-3/4`}>
            {chapterData?.result.title}
          </p>
          <p className={`p-2 text-center text-wrap`}>
            Nội dung chương: {chapterData?.result.content}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <div>
            {proxyData?.data?.result &&
              Object.values(proxyData?.data?.result).map((src, index) => {
                // Kiểm tra nếu src là chuỗi base64 hình ảnh
                if (
                  typeof src === "string" &&
                  (src.startsWith("data:image/jpeg") ||
                    src.startsWith("data:image/png"))
                ) {
                  return (
                    <ImageReader
                      key={index}
                      src={src}
                      index={index}
                      onLoad={(index) =>
                        setLoaded((prev: any) => ({ ...prev, [index]: true }))
                      }
                      loaded={loaded}
                    />
                  );
                } else {
                  return <DocxReader base64String={src as string} />;
                }
              })}
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex gap-2">
        <button
          disabled={isPrev}
          className={`py-2 text-white w-full rounded-lg ${
            isPrev ? "bg-stone-500" : `${theme.background_card}`
          }`}
          onClick={handlePrevChapter}
        >
          Trang trước
        </button>
        <button
          disabled={isNext}
          className={`py-2 text-white w-full rounded-lg ${
            isNext ? "bg-stone-500" : `${theme.background_card}`
          }`}
          onClick={handleNextChapter}
        >
          Trang kế tiếp
        </button>
      </div>
      {/* Only show Popup when showPopup is true */}
      <Popup
        isOpen={showPopup}
        setIsOpen={setShowPopup}
        children={
          <Purchase chap={chapterData?.result} key={chapterData?.result.id} />
        }
      />
    </div>
  );
};

export default Chapter;
