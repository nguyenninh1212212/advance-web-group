import { Link } from "react-router-dom";
import { categoryColor } from "../../util/category";

const CardCategory = ({ name }: { name: string }) => {
  return (
    <Link
      to={`/tag/${name}`}
      className={`${categoryColor(
        name.toLowerCase()
      )} p-1 rounded-md inline-block mx-1 h-9`}
    >
      {name}
    </Link>
  );
};

export default CardCategory;
