import React, { useState } from "react";
import { useTheme } from "../../util/theme/theme";
import { useQuery } from "@tanstack/react-query";
import { getChapterDetail, getChapterProxy } from "../../api/chapter";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Chapter: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<{ [key: number]: boolean }>({});
  const {
    data: chapterData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapter", id],
    queryFn: () => getChapterDetail(id as string),
  });
  console.log("🚀 ~ chapterData:", chapterData);
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
        {" "}
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

  if (error || proxyData?.error) {
    return <p>error</p>;
  }

  return (
    <div className="text-black flex flex-col justify-between">
      <div className="max-w-5xl mx-auto flex-grow">
        {/* Hình ảnh chương */}
        <div className={`${theme.text} grid grid-cols-3 justify-center`}>
          <p className={`p-2 text-center ${theme.background_card} w-3/4`}>
            {chapterData?.result.title}
          </p>
          <p className={`p-2 text-center text-wrap`}>
            Nội dung chương: {chapterData?.result.content}
          </p>
          <p className={``}></p>
        </div>
        <div className="flex justify-center mt-4">
          <div>
            {Object.values(proxyData?.data?.result).map((src, index) => (
              <div key={index} className="relative w-full mb-4">
                {!loaded[index] && (
                  <ClipLoader
                    color={"gray"}
                    cssOverride={{ display: "block", margin: "0 auto" }}
                    loading={loaded[index]}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                <img
                  src={src as string}
                  alt={`img-${index}`}
                  onLoad={() =>
                    setLoaded((prev: any) => ({ ...prev, [index]: true }))
                  }
                  className={`w-full transition-opacity duration-500 ${
                    loaded[index] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nút Trang kế tiếp */}
      <div className="w-full p-4 flex gap-2">
        <button
          className={`py-2 text-white ${theme.background_card} w-full rounded-lg`}
          onClick={handlePrevChapter}
        >
          Trang trước
        </button>
        <button
          className={`py-2 text-white ${theme.background_card} w-full rounded-lg`}
          onClick={handleNextChapter}
        >
          Trang kế tiếp
        </button>
      </div>
    </div>
  );
};

export default Chapter;
