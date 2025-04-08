// pages/chapters/CreateChapter.tsx
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import ImageUpload from "./ImageUploader";
import ExportWord from "./ExportWord";

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
        {/* LEFT */}
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

          {type === "COMIC" && (
            <ImageUpload
              previews={previews}
              onImageChange={handleImageChange}
              removeImage={removeImage}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-2/3 space-y-4">
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

          {type === "NOVEL" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nội dung chương
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black min-h-52 "
                placeholder="Nhập nội dung chương..."
                required
              />
              <ExportWord title={title} description={description} />
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
