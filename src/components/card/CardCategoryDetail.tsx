import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../../redux/slices/categorySlice";
import { RootState } from "../../redux/store";

interface Props {
  name: string;
}

const CardCategoryDetail: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/`);
    dispatch(setCategory(name));
  };

  return (
    <button
      className={`bg-gray-600 text-gray-300 py-1 px-3 rounded-2xl inline-block `}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default React.memo(CardCategoryDetail);
