import React, { useState } from "react";
import { FaPlus, FaUpload } from "react-icons/fa";
import CardTitle from "../../../components/card/CardTitle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "../../../api/category";
import { ICategory } from "../../../type/comic";
import { postStory } from "../../../api/stories";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "../../../util/ToastContext";

const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [type, setType] = useState<"COMIC" | "NOVEL">("COMIC");
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const { showToast } = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["postStory"],
    mutationFn: (formData: FormData) => postStory(formData),
    onSuccess: () => {
      showToast("Thành công khi tạo truyện!", "success");
      queryClient.invalidateQueries({ queryKey: ["list"] });
      setSuccess(!success);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      setSuccess(true);
      showToast("Tạo truyện không thành công!", "error");
    },
  });

  if (isLoading)
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
  if (error) {
    return (
      <p>Error : {error instanceof Error ? error.message : String(error)}</p>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // Hiển thị toast thay vì alert nếu bạn đã có hệ thống toast
        alert("Ảnh phải nhỏ hơn 2MB!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Cố định kích thước 600x900
            canvas.width = 600;
            canvas.height = 900;

            // Resize hình ảnh vào kích thước mới (bị co kéo nếu không tỉ lệ)
            ctx.drawImage(img, 0, 0, 600, 900);

            const newImageUrl = canvas.toDataURL("image/jpeg");
            setPreview(newImageUrl); // hiển thị ảnh preview
            setCover(file); // lưu ảnh gốc (nếu cần gửi lên server)
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const dataPost = {
    title: title,
    description: description,
    type: type,
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
    })),
  };

  const handleSubmitFormdata = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const formData = new FormData();
    formData.append("storyJson", JSON.stringify(dataPost));
    if (cover) {
      formData.append("image_cover", cover);
    }
    mutation.mutate(formData);
  };

  return (
    <div className="my-3">
      <CardTitle title="Thêm truyện" />
      <form
        onSubmit={handleSubmitFormdata}
        className="flex gap-6 flex-wrap md:flex-nowrap m-3"
      >
        {/* LEFT: Ảnh bìa */}
        <div className=" flex flex-col space-y-4 w-1/3 h-full">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Ảnh bìa
          </label>
          <div className="flex items-center gap-3 flex-col-reverse">
            {/* Nút chọn ảnh */}
            <label className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition w-full  justify-center">
              <FaUpload />
              <span>Chọn ảnh</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Nếu không có ảnh, hiển thị khung placeholder */}
            {!preview ? (
              <div className="relative w-2/3 h-80 border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500">
                <span>Chưa chọn ảnh</span>
              </div>
            ) : (
              // Nếu có ảnh, hiển thị ảnh đã chọn
              <div className="relative w-2/3 h-80">
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-lg w-full h-full object-cover border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCover(null);
                    setPreview(null);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg hover:bg-red-600 transition"
                >
                  Huỷ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Thông tin truyện */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tên truyện
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
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black h-52"
              placeholder="Nhập mô tả cho truyện"
              rows={4}
              required
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Thể loại
            </label>
            <div className="flex flex-wrap gap-2">
              {data?.data.map((cat: ICategory) => {
                const isSelected = categories.some((c) => c.id === cat.id);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setCategories((prev) =>
                        isSelected
                          ? prev.filter((c) => c.id !== cat.id)
                          : [...prev, cat]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Loại truyện
            </label>
            <div className="flex gap-3">
              {["COMIC", "NOVEL"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setType(val as "COMIC" | "NOVEL")}
                  className={`px-4 py-1 rounded-full text-sm border font-medium transition-all ${
                    type === val
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  {val === "COMIC" ? "Comic" : "Novel"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={!success}
            type="submit"
            className={`w-full flex items-center justify-center gap-2 cursor-pointer ${
              success ? "bg-indigo-600" : "bg-indigo-400 cursor-not-allowed"
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
                <FaPlus />
                Thêm Truyện
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
