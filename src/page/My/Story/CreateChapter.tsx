import React, { useState } from "react";
import { FaPlus, FaUpload, FaTrash } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";

const CreateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [covers, setCovers] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      Array.from(files).forEach((file) => {
        if (file.size <= 2 * 1024 * 1024) {
          newFiles.push(file);
          newPreviews.push(URL.createObjectURL(file));
        } else {
          alert(`Ảnh "${file.name}" phải nhỏ hơn 2MB!`);
        }
      });

      setCovers((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const updatedCovers = [...covers];
    const updatedPreviews = [...previews];
    updatedCovers.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setCovers(updatedCovers);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory = {
      title,
      description,
      covers,
    };
    console.log("Story submitted:", newStory);

    // TODO: Gửi dữ liệu lên server tại đây
  };

  return (
    <div className="my-3">
      <CardTitle title="Thêm chương" />
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 flex-wrap md:flex-nowrap m-3"
      >
        {/* LEFT: Ảnh bìa */}
        <div className="flex flex-col space-y-4 w-full md:w-1/3 h-full">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Ảnh bìa
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition justify-center">
            <FaUpload />
            <span>Chọn ảnh</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Danh sách ảnh preview dạng cột dọc */}
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
        </div>

        {/* RIGHT: Thông tin truyện */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tên chương
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
              placeholder="Nhập tên truyện"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nội dung chương
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
              placeholder="Nhập mô tả cho truyện"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
          >
            <FaPlus />
            Thêm Truyện
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChapter;
