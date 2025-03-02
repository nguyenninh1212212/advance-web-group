import React from "react";

const Chapter: React.FC = () => {
  return (
    <div className="text-black min-h-screen p-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề chương */}
        <h2 className="text-xl font-bold">Chapter 248</h2>
        <p className="text-red-500 text-sm">
          The Story of an Exploration Hero Who Has Worked His Way up From Common
          People
        </p>

        {/* Thông tin */}
        <div className="flex justify-between items-center  p-2 rounded-lg mt-2">
          <span>Vol. 5, Ch. 33</span>
          <span>Pg. 1 / 20</span>
          <button className="text-gray-300">Menu &#9664;</button>
        </div>

        {/* Nhóm dịch giả */}
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="flex items-center gap-2">
            <span role="img" aria-label="icon">
              👥
            </span>{" "}
            Goro scans
          </span>
          <span>Costarican One Man Scan</span>
        </div>

        {/* Hình ảnh chương */}
        <div className="flex justify-center mt-4">
          <img
            src="https://thuviensohoa.vn/img/comic/Tho-San-Quy/img_03321.jpg?v=4.17" // Thay thế bằng link ảnh thực tế
            alt="Chapter Cover"
            className="w-96 rounded-lg shadow-lg"
          />
        </div>
      </div>
      <center className="w-full ">
        <button className="my-2 py-2 bg-primary-300 w-full rounded-lg">
          Trang kế tiếp
        </button>
      </center>
    </div>
  );
};

export default Chapter;
