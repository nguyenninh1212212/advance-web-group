import React, { useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

// Hàm hiển thị sao đã chọn và sao chưa chọn
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleClick = (index: number) => {
    setRating(index + 1); // Cập nhật số sao đã chọn
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl text-yellow-500`}
          onClick={() => handleClick(index)}
        >
          {index < rating ? (
            <>
              <TiStarFullOutline />
            </>
          ) : (
            <>
              <TiStarOutline />
            </>
          )}
        </span>
      ))}
    </div>
  );
};

const Rate = () => {
  const [rating, setRating] = useState<number>(0); // Lưu trữ giá trị đánh giá sao
  return (
    <div className="flex flex-col items-center p-4 space-y-3">
      <h2 className="text-xl font-semibold text-white">Đánh giá của bạn</h2>

      {/* Hiển thị giao diện sao */}
      <StarRating rating={rating} setRating={setRating} />

      <div className="mt-3 text-lg text-gray-600">
        {rating === 0 ? "Chưa đánh giá" : `Bạn đã chọn ${rating} sao`}
      </div>
    </div>
  );
};

export default Rate;
