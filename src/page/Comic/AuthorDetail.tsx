import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin tác giả
    fetch(`/api/authors/${id}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data));
  }, [id]);

  if (!author) return <p>Đang tải...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold"></h1>
      {/* hiển thị truyện, mô tả, v.v. */}
    </div>
  );
};

export default AuthorDetail;
