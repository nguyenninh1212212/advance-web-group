import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const error = searchParams.get("error");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } else if (error) {
      // Có thể hiển thị toast hoặc lưu lỗi
      alert(decodeURIComponent(error));
      navigate("/auth/login");
    } else {
      navigate("/auth/login");
    }
  }, [searchParams, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2RedirectHandler;
