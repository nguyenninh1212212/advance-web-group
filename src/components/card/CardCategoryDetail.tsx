import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
}

const CardCategoryDetail: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genders/${name}`);
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
