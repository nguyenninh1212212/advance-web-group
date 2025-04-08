import React, { useState } from "react";
import { FaPlus, FaUpload, FaTrash } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";

const CreateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"COMIC" | "NOVEL">("COMIC");
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
    const newChapter = {
      title,
      description: type === "NOVEL" ? description : null,
      images: type === "COMIC" ? covers : null,
      type,
    };
    console.log("Chapter submitted:", newChapter);

    // TODO: Gửi dữ liệu lên server tại đây
  };

  return (
    <div className="my-3">
      <CardTitle title="Thêm chương" />
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 flex-wrap md:flex-nowrap m-3"
      >
        {/* LEFT: Điều chỉnh theo loại truyện */}
        <div className="flex flex-col space-y-4 w-full md:w-1/3 h-full">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Loại truyện
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "COMIC" | "NOVEL")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="COMIC">Truyện tranh (Comic)</option>
            <option value="NOVEL">Truyện chữ (Novel)</option>
          </select>

          {/* Nếu là COMIC thì hiển thị upload ảnh */}
          {type === "COMIC" && (
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
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Danh sách ảnh preview */}
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
          )}
        </div>

        {/* RIGHT: Thông tin chương */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
              placeholder="Nhập tên chương"
              required
            />
          </div>

          {/* Nếu là NOVEL thì hiển thị ô nhập nội dung */}
          {type === "NOVEL" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nội dung chương
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black min-h-[200px]"
                placeholder="Nhập nội dung chương..."
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
          >
            <FaPlus />
            Thêm chương
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChapter;
