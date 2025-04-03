import React from "react";

const Chapter: React.FC = () => {
  return (
    <div className="text-black flex flex-col justify-between">
      <div className="max-w-5xl mx-auto flex-grow">
        {/* Hình ảnh chương */}
        <div className="flex justify-center mt-4">
          <img
            src="https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17"
            alt="Chapter Cover"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Nút Trang kế tiếp */}
      <div className="w-full p-4">
        <button className="py-2 text-white bg-primary-200 w-full rounded-lg">
          Trang kế tiếp
        </button>
      </div>
    </div>
  );
};

export default Chapter;
