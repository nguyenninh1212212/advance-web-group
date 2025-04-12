import React from "react";
import { FaCamera } from "react-icons/fa"; // Import icon camera từ react-icons

interface ImageUploadProps {
  previews: string[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  previews,
  onImageChange,
  removeImage,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300">Ảnh bìa</label>

      {/* Cải tiến nút upload */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="cursor-pointer py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <FaCamera className="inline mr-2" />
          Chọn ảnh
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </div>

      <div className="mt-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative inline-block mr-4 mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
