import React, { useState } from "react";
import { IStory } from "../../type/comic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreStory, deleteStory } from "../../api/stories";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "../../util/ToastContext";
import Popup from "../popup/Popup";

interface payload {
  data: IStory;
}

const CardDeleteStory: React.FC<payload> = ({ data }) => {
  const { categories, coverImage, createdAt, id, title } = data;
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isConfirmRestoreOpen, setIsConfirmRestoreOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const { mutate: restoreMutate, isPending: isRestoring } = useMutation({
    mutationFn: () => restoreStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-list"] });
      queryClient.invalidateQueries({ queryKey: ["list"] });
      showToast("Khôi phục thành công!!", "success");
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash-list"] });
      showToast("Xóa thành công", "success");
    },
    onError: (error) => {
      showToast(error as unknown as string, "error");
    },
  });

  return (
    <div className="bg-red-200 dark:bg-gray-700 rounded-lg flex my-4 overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-auto">
      <img
        src={coverImage}
        alt={title}
        className="w-[150px] h-50 object-cover"
      />

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
            {createdAt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 my-2">
          {categories.map((item, index) => (
            <span
              key={index}
              className="bg-gray-300 dark:bg-gray-600 text-xs text-gray-700 dark:text-white px-2 py-1 rounded-full"
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setIsConfirmRestoreOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded text-sm flex items-center justify-center min-w-[70px] max-md:text-xs"
            disabled={isRestoring}
          >
            {isRestoring ? (
              <ClipLoader
                color={"gray"}
                cssOverride={{ display: "block", margin: "0 auto" }}
                loading={isRestoring}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Khôi phục"
            )}
          </button>

          <button
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center justify-center min-w-[70px] max-md:text-xs"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ClipLoader
                color={"gray"}
                cssOverride={{ display: "block", margin: "0 auto" }}
                loading={isDeleting}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Xoá vĩnh viễn"
            )}
          </button>
        </div>
      </div>

      {/* Popup xác nhận khôi phục */}
      <Popup isOpen={isConfirmRestoreOpen} setIsOpen={setIsConfirmRestoreOpen}>
        <div className="p-4 text-center">
          <p className="text-white mb-4">
            Bạn có chắc chắn muốn khôi phục truyện này?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                restoreMutate();
                setIsConfirmRestoreOpen(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setIsConfirmRestoreOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      </Popup>

      {/* Popup xác nhận xoá vĩnh viễn */}
      <Popup isOpen={isConfirmDeleteOpen} setIsOpen={setIsConfirmDeleteOpen}>
        <div className="p-4 text-center">
          <p className="text-white mb-4">
            Bạn có chắc chắn muốn xoá <strong>vĩnh viễn</strong> truyện này?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                deleteMutate();
                setIsConfirmDeleteOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setIsConfirmDeleteOpen(false)}
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

export default CardDeleteStory;
