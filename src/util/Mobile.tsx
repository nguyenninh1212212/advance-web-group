import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false); // mặc định false

  useEffect(() => {
    // Kiểm tra nếu đang ở client
    if (typeof window !== "undefined") {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= breakpoint);
      };

      checkIsMobile(); // Đảm bảo kiểm tra ngay lần đầu

      window.addEventListener("resize", checkIsMobile);

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }
  }, [breakpoint]);

  return isMobile;
};
