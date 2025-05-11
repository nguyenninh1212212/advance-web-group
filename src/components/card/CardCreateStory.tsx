import React, { useState } from "react";
import { IStory } from "../../type/comic";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSoftStory, toggleVisibility } from "../../api/stories";
import { useToast } from "../../util/ToastContext";
import Popup from "../popup/Popup";
import {
  availbleTheme,
  useTheme,
  visibilityTheme,
} from "../../util/theme/theme";
import { BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";

interface payload {
  data: IStory;
}

const CardCreateStory: React.FC<payload> = ({ data }) => {
  const { card_cate, card_comic, text } = useTheme();

  const {
    categories,
    coverImage,
    createdAt,
    id,
    type,
    title,
    isAvailble,
    visibility,
  } = data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: softDelete } = useMutation({
    mutationFn: () => deleteSoftStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      queryClient.invalidateQueries({ queryKey: ["trash-list"] });
      showToast("Chuyển vào thùng rác thành công thành công", "success");
    },
    onError: (error) => {
      showToast(error as unknown as string, "error");
    },
  });
  const { mutate: handleVisibility } = useMutation({
    mutationFn: ({ visibility, id }: { visibility: boolean; id: string }) =>
      toggleVisibility(visibility, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      showToast(`${visibility == true ? "Ẩn" : "Hiển thị công khai"}`, "info");
    },
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      showToast(error as unknown as string, "error");
    },
  });

  const handleAddChapter = () => {
    localStorage.setItem("id_story", id);
    localStorage.setItem("type", type);
    navigate(`/my/list/${title}/chapter/add`);
  };

  return (
    <div
      className={`${card_comic} rounded-lg flex my-4 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-auto`}
    >
      <img src={coverImage} alt="" className="w-[150px] h-60" />

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="md:text-xl text-lg font-semibold text-white ">
            {title}
          </h2>

          <p
            className={`text-gray-400 md:text-sm text-xs mt-2 ${
              showMore ? "" : "line-clamp-2"
            }`}
          >
            {createdAt}
          </p>
          <p
            className={`text-white p-1 w-fit rounded-lg md:text-sm text-xs mt-2 ${availbleTheme[isAvailble]} `}
          >
            {isAvailble}
          </p>

          <button
            className="text-blue-400 text-sm mt-1"
            onClick={toggleShowMore}
          >
            {showMore ? "Less" : "More"}
          </button>
        </div>

        <div className="flex items-center flex-wrap gap-2 my-2">
          {categories.map((item, index) => (
            <span
              key={index}
              className={`${card_cate} ${text}  px-2 py-1 rounded-full text-sm`}
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex space-x-2 ">
          <button
            onClick={handleAddChapter}
            className="bg-indigo-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            <IoAdd className="text-2xl" />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            <BiTrash className="text-2xl" />
          </button>
          <button
            onClick={() =>
              handleVisibility({ visibility: !visibility, id: id })
            }
            className={`${
              visibilityTheme[visibility.toString()]
            } text-white px-3 py-1 rounded-lg text-sm transition`}
          >
            {visibility ? (
              <BiLockOpen className="text-2xl" />
            ) : (
              <BiLock className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4 text-center">
          <p className="text-white mb-4">
            Bạn có chắc chắn muốn chuyển truyện này vào thùng rác?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                softDelete(); // gọi hàm xóa
                setIsOpen(false); // đóng popup
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CardCreateStory;
