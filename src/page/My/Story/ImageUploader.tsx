// components/ImageUpload.tsx
import React from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

interface Props {
  previews: string[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const ImageUpload: React.FC<Props> = ({
  previews,
  onImageChange,
  removeImage,
}) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-300">
        Ảnh chương
      </label>
      <label className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition justify-center">
        <FaUpload />
        <span>Chọn ảnh</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onImageChange}
          className="hidden"
        />
      </label>

      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
        {previews.length === 0 ? (
          <div className="relative w-full h-40 border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500">
            <span>Chưa chọn ảnh</span>
          </div>
        ) : (
          previews.map((src, index) => (
            <div key={index} className="relative w-full h-60">
              <img
                src={src}
                alt={`preview-${index}`}
                className="rounded-lg w-full h-full object-cover border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg hover:bg-red-600 transition"
              >
                <FaTrash className="inline-block mr-1" />
                Xoá
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ImageUpload;
