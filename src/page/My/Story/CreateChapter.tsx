import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import ExportWord from "./ExportWord";
import ImageUpload from "./ImageUploader";
import { useMutation } from "@tanstack/react-query";
import { postChapter } from "../../../api/chapter";
import { useToast } from "../../../util/ToastContext";
import ClipLoader from "react-spinners/ClipLoader";

const CreateChapter = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState<boolean>(true);
  const [file, setFile] = useState<File[]>([]);
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationKey: ["addchapter"],
    mutationFn: (formData: FormData) => postChapter(formData),
    onSuccess: () => {
      showToast("Thêm chương thành công", "success");
      setTitle("");
      setPrice(0.0);
      setFile([]);
      setDescription("");
      setSuccess(true); // Enable submit button again
    },

    onError: (error) => {
      showToast(error.message, "error");
      setSuccess(true); // Enable submit button again
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false); // Disable button during the mutation
    const formData = new FormData();
    const chapterJson = {
      story_id: localStorage.getItem("id_story"),
      content: title,
      price: price,
    };
    formData.append("chapterJson", JSON.stringify(chapterJson));
    file.forEach((f) => formData.append("files", f));
    await mutation.mutate(formData);
  };

  return (
    <div className="my-3">
      <CardTitle title="Thêm chương" />
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 flex-wrap md:flex-nowrap m-3 justify-center"
      >
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

          {/* Thêm trường giá trị */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Giá
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
              placeholder="Nhập giá chương"
              required
            />
          </div>

          {localStorage.getItem("type") === "NOVEL" ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nội dung chương
              </label>

              <ExportWord
                title={title}
                description={description}
                setDescription={setDescription}
                setFile={setFile}
              />
            </div>
          ) : (
            <div>
              <h2>Upload Images</h2>
              <ImageUpload setFile={setFile} />{" "}
              {/* Truyền setFile vào ImageUpload */}
            </div>
          )}

          <button
            disabled={!success || file.length === 0} // Kiểm tra nếu không có file
            type="submit"
            className={`w-full flex items-center justify-center gap-2 cursor-pointer ${
              success && file.length > 0
                ? "bg-indigo-600"
                : "bg-stone-500 cursor-not-allowed"
            } text-white py-2 px-4 rounded-xl transition`}
          >
            {!success ? (
              <ClipLoader
                color={"white"}
                cssOverride={{ display: "block", margin: "0 auto" }}
                loading={!success}
                size={30}
                aria-label="Loading Spinner"
              />
            ) : (
              <>
                {file.length <= 0 ? (
                  <p>Chưa có file nào</p>
                ) : (
                  <>
                    <FaPlus />
                    Thêm chương
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChapter;
