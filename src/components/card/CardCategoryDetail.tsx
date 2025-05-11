import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../../redux/slices/categorySlice";

interface Props {
  name: string;
  id: string;
}

const CardCategoryDetail: React.FC<Props> = ({ name, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/`);
    dispatch(setCategory({ name, id }));
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
