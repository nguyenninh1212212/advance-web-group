import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/categorySlice";
import { RootState } from "../../redux/store";

interface Props {
  name: string;
}

const CardCategory: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const handleClick = () => {
    dispatch(setCategory(name));
  };

  return (
    <button
      className={`bg-gray-600 text-gray-300 py-1 px-3 rounded-2xl inline-block ${
        selectedCategory === name ? "bg-indigo-600 text-white" : ""
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default React.memo(CardCategory);
