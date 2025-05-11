import React, { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Import icon camera từ react-icons

// Định nghĩa kiểu cho prop setFile
interface ImageUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File[]>>; // Kiểu cho setFile
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setFile }) => {
  const [previews, setPreviews] = useState<string[]>([]); // Quản lý ảnh đã chọn
  const [files, setFiles] = useState<File[]>([]); // Quản lý file ảnh gốc

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      Array.from(selectedFiles).forEach((file) => {
        if (file.size <= 2 * 1024 * 1024) {
          // Kiểm tra kích thước file
          newFiles.push(file);
          newPreviews.push(URL.createObjectURL(file)); // Tạo đường dẫn ảnh tạm
        } else {
          alert(`Ảnh "${file.name}" phải nhỏ hơn 2MB!`);
        }
      });

      setFiles((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
      setFile((prevFiles) => [...prevFiles, ...newFiles]); // Cập nhật state từ bên ngoài
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = [...previews];
    const updatedFiles = [...files];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
    setFile(updatedFiles); // Cập nhật lại state files
  };

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
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="mt-4">
        {previews.length === 0 && (
          <p className="text-gray-400">Chưa có ảnh nào được chọn.</p>
        )}
        {previews.map((preview, index) => (
          <div key={index} className="relative inline-block mr-4 mb-4">
            <img
              src={preview}
              alt={`preview-${index}`}
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
