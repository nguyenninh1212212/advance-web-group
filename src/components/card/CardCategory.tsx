import { Link } from "react-router-dom";

const CardCategory = ({ name }: { name: string }) => {
  return (
    <Link
      to={`/tag/${name}`}
      className={` bg-gray-600 text-gray-300 py-1 px-2 rounded-md inline-block `}
    >
      {name}
    </Link>
  );
};

export default CardCategory;
